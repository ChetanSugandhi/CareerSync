const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const Job = require('../models/Job');
const User = require('../models/User');
const { auth, checkRole } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const axios = require('axios');

// Apply for a job (student only)
router.post('/', auth, checkRole(['student']), [
    body('jobId').notEmpty().withMessage('Job ID is required'),
    body('resumeId').notEmpty().withMessage('Resume ID is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { jobId, resumeId } = req.body;
    const candidateId = req.user._id;

    // Check if application already exists
    const existingApplication = await Application.findOne({ job: jobId, candidate: candidateId });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    // Basic check if job and resume exist (more robust validation might be needed)
    const job = await Job.findById(jobId);
    if (!job) {
        return res.status(404).json({ message: 'Job not found' });
    }
    // You might want to check if the resume belongs to the user here too

    const newApplication = new Application({
      job: jobId,
      candidate: candidateId,
      resume: resumeId,
      status: 'applied', // Default status
    });

    await newApplication.save();

    // Populate application with job and candidate details for email
    const populatedApplication = await Application.findById(newApplication._id)
      .populate('job', 'title company')
      .populate('candidate', 'firstName lastName email');

    if (populatedApplication) {
      // Send application received email via frontend API
      try {
           await axios.post(`${process.env.FRONTEND_URL}/api/email/send`, {
              to: populatedApplication.candidate.email,
              subject: `Application Received - ${populatedApplication.job.title}`,
              body: `
Dear ${populatedApplication.candidate.firstName},

Thank you for applying to the ${populatedApplication.job.title} position at ${populatedApplication.job.company}. We have received your application and will review it shortly.

Best regards,
${populatedApplication.job.company} Team
`,
            });
           console.log(`Application received email sent to ${populatedApplication.candidate.email}`);
        } catch (emailError) {
            console.error('Failed to send application received email:', emailError);
            // Decide if you want to return an error to the user or just log it
        }
    }

    res.status(201).json(newApplication);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all applications (admin/recruiter - potentially with filters)
router.get('/', auth, checkRole(['recruiter', 'admin']), async (req, res) => {
  try {
    // Recruiters might only see applications for their jobs
    let filter = {};
    if (req.user.role === 'recruiter') {
      const jobsPostedByRecruiter = await Job.find({ postedBy: req.user._id }).select('_id');
      const jobIds = jobsPostedByRecruiter.map(job => job._id);
      filter = { job: { $in: jobIds } };
    }

    const applications = await Application.find(filter)
      .populate('job', 'title company')
      .populate('candidate', 'firstName lastName email')
      .sort({ appliedAt: -1 }); // Sort by most recent application

    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get applications for a specific job (recruiter only, must be the job poster)
router.get('/job/:jobId', auth, checkRole(['recruiter']), async (req, res) => {
  try {
    const jobId = req.params.jobId;

    // Verify that the recruiter posted this job
    const job = await Job.findOne({ _id: jobId, postedBy: req.user._id });
    if (!job) {
      return res.status(404).json({ message: 'Job not found or you are not authorized to view applications' });
    }

    const applications = await Application.find({ job: jobId })
      .populate('candidate', 'firstName lastName email')
      .populate('resume', 'title')
      .sort({ appliedAt: -1 }); // Sort by most recent application

    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get applications for the authenticated candidate (student only)
router.get('/me', auth, checkRole(['student']), async (req, res) => {
  try {
    const applications = await Application.find({ candidate: req.user._id })
      .populate('job', 'title company location')
      .populate('resume', 'title') // Also populate resume for candidate view
      .sort({ appliedAt: -1 }); // Sort by most recent application

    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single application by ID (user must be candidate or job poster)
router.get('/:id', auth, async (req, res) => {
    try {
        const applicationId = req.params.id;
        const userId = req.user._id;
        const userRole = req.user.role;

        const application = await Application.findById(applicationId)
            .populate('job', 'postedBy') // Populate job to check poster
            .populate('candidate', '_id'); // Populate candidate to check ownership

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        // Check if user is the candidate or the job poster
        const isCandidate = application.candidate._id.toString() === userId.toString();
        const isJobPoster = application.job.postedBy.toString() === userId.toString();

        if (!isCandidate && !isJobPoster && userRole !== 'admin') {
             return res.status(403).json({ message: 'You are not authorized to view this application' });
        }

        // Re-populate with more details for the response
        const fullApplication = await Application.findById(applicationId)
            .populate('job', 'title company location')
            .populate('candidate', 'firstName lastName email')
            .populate('resume', 'title fileUrl'); // Populate resume details

        res.json(fullApplication);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update application status (recruiter only, must be the job poster)
router.put('/:id/status', auth, checkRole(['recruiter']), [
    body('status').isIn(['under review', 'shortlisted', 'rejected', 'interviewing', 'applied']).withMessage('Invalid application status'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const applicationId = req.params.id;
    const { status } = req.body;

    // Find the application and populate job and candidate
    const application = await Application.findById(applicationId)
      .populate('job', 'postedBy title company') // Populate job to check poster and get details for email
      .populate('candidate', 'firstName lastName email'); // Populate candidate for email

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Verify that the recruiter is the job poster
    if (application.job.postedBy.toString() !== req.user._id.toString()) {
       return res.status(403).json({ message: 'You are not authorized to update this application' });
    }

    // Store old status to avoid sending email if status didn't change
    const oldStatus = application.status;

    // Update the status
    application.status = status;
    await application.save();

    // Send application status email only if the status changed and is one of the specified statuses
    const statusForEmail = ['under review', 'shortlisted', 'rejected', 'interviewing', 'applied'].includes(status) ? status : null;

    if (status !== oldStatus && statusForEmail) {
        // Map internal status to email template type if necessary (e.g., 'under review' might use 'application_received' or a generic update)
        const templateType = statusForEmail === 'applied' ? 'application_received' : `application_${statusForEmail}`;

        try {
            // We need to manually construct the email data based on the template logic in frontend
            let emailSubject = '';
            let emailBody = '';

            // This part is a simplification. In a real app, you might fetch template content or have more complex logic
            if (statusForEmail === 'received') { // Mapping 'applied' status to 'received' template
                emailSubject = `Application Received - ${application.job.title}`;
                emailBody = `Dear ${application.candidate.firstName},

Thank you for applying to the ${application.job.title} position at ${application.job.company}. We have received your application and will review it shortly.

Best regards,
${application.job.company} Team`;
            } else if (statusForEmail === 'shortlisted') {
                 emailSubject = `Application Shortlisted - ${application.job.title}`;
                 emailBody = `Dear ${application.candidate.firstName},

Congratulations! Your application for the ${application.job.title} position at ${application.job.company} has been shortlisted. 
We would like to schedule an interview with you.

Best regards,
${application.job.company} Team`;
            } else if (statusForEmail === 'rejected') {
                 emailSubject = `Application Status Update - ${application.job.title}`;
                 emailBody = `Dear ${application.candidate.firstName},

Thank you for your interest in the ${application.job.title} position at ${application.job.company}. 
After careful consideration, we have decided to move forward with other candidates.

We wish you the best in your job search.

Best regards,
${application.job.company} Team`;
            } else { // For 'under review', 'interviewing', or other statuses not explicitly templated
                 emailSubject = `Application Status Updated - ${application.job.title}`;
                 emailBody = `Dear ${application.candidate.firstName},

Your application status for the ${application.job.title} position at ${application.job.company} has been updated to: ${status}.

Best regards,
${application.job.company} Team`;
            }

             await axios.post(`${process.env.FRONTEND_URL}/api/email/send`, {
                to: application.candidate.email,
                subject: emailSubject,
                body: emailBody,
            });

        if (emailSent) {
          console.log(`Application status email (${status}) sent to ${application.candidate.email}`);
        } else {
          console.error(`Failed to send application status email (${status}) to ${application.candidate.email}`);
        }
        } catch (emailError) {
            console.error(`Failed to send application status email (${status}):`, emailError);
            // Decide if you want to return an error to the user or just log it
        }
    }

    res.json(application);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// (Optional) Delete an application (perhaps by candidate or admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const applicationId = req.params.id;
    const userId = req.user._id;
    const userRole = req.user.role;

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Allow candidate to withdraw their application or admin to delete
    if (application.candidate.toString() !== userId.toString() && userRole !== 'admin') {
      return res.status(403).json({ message: 'You are not authorized to delete this application' });
    }

    // Optional: Add logic to notify recruiter/admin about withdrawn application

    await Application.findByIdAndDelete(applicationId); // Use findByIdAndDelete

    res.json({ message: 'Application deleted successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 