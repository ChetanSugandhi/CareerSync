const express = require('express');
const router = express.Router();
const Interview = require('../models/Interview');
const Job = require('../models/Job');
const User = require('../models/User');
const { auth, checkRole } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const axios = require('axios');

// Schedule a new interview (recruiter only)
router.post('/', auth, checkRole(['recruiter']), [
    body('jobId').notEmpty().withMessage('Job ID is required'),
    body('candidateId').notEmpty().withMessage('Candidate ID is required'),
    body('date').isISO8601().toDate().withMessage('Valid date and time are required'),
    body('duration').isInt({ gt: 0 }).withMessage('Duration must be a positive integer'),
    body('type').isIn(['online', 'onsite']).withMessage('Invalid interview type'),
    body('location').optional().notEmpty().if(body('type').equals('onsite')).withMessage('Location is required for onsite interviews'),
    body('meetingLink').optional().isURL().if(body('type').equals('online')).withMessage('Valid meeting link is required for online interviews'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { jobId, candidateId, date, duration, type, location, meetingLink, notes } = req.body;
    const interviewerId = req.user._id;

    // Basic check if job and candidate exist (more robust validation might be needed)
    const job = await Job.findById(jobId);
    const candidate = await User.findById(candidateId);
    if (!job || !candidate) {
        return res.status(404).json({ message: 'Job or Candidate not found' });
    }

    const newInterview = new Interview({
      job: jobId,
      candidate: candidateId,
      interviewer: interviewerId,
      date: new Date(date), // Ensure date is a Date object
      duration,
      type,
      location,
      meetingLink,
      notes,
      status: 'scheduled', // Default status
    });

    await newInterview.save();

    // Populate interview with job and candidate details for email
    const populatedInterview = await Interview.findById(newInterview._id)
      .populate('job', 'title company')
      .populate('candidate', 'firstName lastName email');

    if (populatedInterview) {
        // Send interview scheduled email via frontend API
        try {
             await axios.post(`${process.env.FRONTEND_URL}/api/email/send`, {
                to: populatedInterview.candidate.email,
                subject: `Interview Scheduled - ${populatedInterview.job.title}`,
                body: `
Dear ${populatedInterview.candidate.firstName},

Your interview for the ${populatedInterview.job.title} position at ${populatedInterview.job.company} has been scheduled for ${new Date(populatedInterview.date).toLocaleDateString()} at ${new Date(populatedInterview.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.

Interview Details:
Type: ${populatedInterview.type}
${populatedInterview.type === 'online' ? `Meeting Link: ${populatedInterview.meetingLink}` : `Location: ${populatedInterview.location}`}

Best regards,
${populatedInterview.job.company} Team
`,
            });
           console.log(`Interview scheduled email sent to ${populatedInterview.candidate.email}`);
        } catch (emailError) {
            console.error('Failed to send interview scheduled email:', emailError);
            // Decide if you want to return an error to the user or just log it
        }
    }

    res.status(201).json(newInterview);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get interviews for a user (candidate or interviewer)
router.get('/me', auth, async (req, res) => {
  try {
    const userId = req.user._id;

    const interviews = await Interview.find({
      $or: [{ candidate: userId }, { interviewer: userId }]
    })
    .populate('job', 'title company')
    .populate('candidate', 'firstName lastName')
    .populate('interviewer', 'firstName lastName')
    .sort({ date: 1 }); // Sort by upcoming interviews

    res.json(interviews);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single interview by ID (user must be candidate, interviewer, or admin)
router.get('/:id', auth, async (req, res) => {
    try {
        const interviewId = req.params.id;
        const userId = req.user._id;
        const userRole = req.user.role;

        const interview = await Interview.findById(interviewId)
            .populate('job', 'postedBy') // Populate job to check if user is the poster
            .populate('candidate', '_id') // Populate candidate to check ownership
            .populate('interviewer', '_id'); // Populate interviewer to check ownership

        if (!interview) {
            return res.status(404).json({ message: 'Interview not found' });
        }

        // Check if user is the candidate, interviewer, or admin
        const isCandidate = interview.candidate._id.toString() === userId.toString();
        const isInterviewer = interview.interviewer._id.toString() === userId.toString();

        if (!isCandidate && !isInterviewer && userRole !== 'admin') {
             return res.status(403).json({ message: 'You are not authorized to view this interview' });
        }

         // Re-populate with more details for the response
        const fullInterview = await Interview.findById(interviewId)
            .populate('job', 'title company location')
            .populate('candidate', 'firstName lastName email')
            .populate('interviewer', 'firstName lastName email');

        res.json(fullInterview);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update interview details (recruiter only, must be the interviewer)
router.put('/:id', auth, checkRole(['recruiter']), async (req, res) => {
  try {
    const interviewId = req.params.id;
    const updates = req.body;

    // Find the interview and populate interviewer
    const interview = await Interview.findById(interviewId).populate('interviewer', '_id');

    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    // Verify that the recruiter is the interviewer
    if (interview.interviewer._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to update this interview' });
    }

    // Apply updates
    Object.keys(updates).forEach(key => {
      interview[key] = updates[key];
    });

    await interview.save();

    // Optional: Send update notification email if details changed (requires comparing old and new data)
    // This is more complex and not included here.

    res.json(interview);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel an interview (recruiter only, must be the interviewer)
router.post('/:id/cancel', auth, checkRole(['recruiter']), async (req, res) => {
  try {
    const interviewId = req.params.id;

    // Find the interview and populate interviewer, candidate, and job for email
     const interview = await Interview.findById(interviewId)
        .populate('interviewer', '_id')
        .populate('candidate', 'firstName lastName email')
        .populate('job', 'title company');

    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    // Verify that the recruiter is the interviewer
    if (interview.interviewer._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to cancel this interview' });
    }

     // Check if the interview is already cancelled to prevent duplicate emails
    if (interview.status === 'cancelled') {
        return res.status(400).json({ message: 'Interview is already cancelled' });
    }

    // Update status to cancelled
    interview.status = 'cancelled';
    await interview.save();

    // Send cancellation email notification via frontend API
     if (interview.candidate) { // Ensure candidate data is populated
         try {
             await axios.post(`${process.env.FRONTEND_URL}/api/email/send`, {
                to: interview.candidate.email,
                subject: `Interview Cancelled - ${interview.job.title}`,
                body: `
Dear ${interview.candidate.firstName},

Your interview for the ${interview.job.title} position has been cancelled.

Best regards,
${interview.job.company} Team
                `,
            });
            console.log(`Interview cancellation email sent to ${interview.candidate.email}`);
         } catch (emailError) {
             console.error('Failed to send interview cancellation email:', emailError);
             // Decide if you want to return an error to the user or just log it
         }
    }

    res.json({ message: 'Interview cancelled successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 