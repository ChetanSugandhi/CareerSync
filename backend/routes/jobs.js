const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const { auth, checkRole } = require('../middleware/auth');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const axios = require('axios');

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().populate('postedBy', 'firstName lastName').sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'firstName lastName');
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new job (recruiter only)
router.post('/', auth, checkRole(['recruiter']), [
  body('title').notEmpty().withMessage('Job title is required'),
  body('company').notEmpty().withMessage('Company name is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('jobType').isIn(['full-time', 'part-time', 'contract', 'temporary', 'internship']).withMessage('Invalid job type'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, company, location, description, requirements, salary, jobType, industry } = req.body;

    const newJob = new Job({
      title,
      company,
      location,
      description,
      requirements,
      salary,
      jobType,
      industry,
      postedBy: req.user._id,
    });

    await newJob.save();

    // Optional: Send job alert emails to users based on preferences
    // This would involve querying users based on job criteria and sending emails via frontend API:
    // const usersToNotify = await User.find({ /* criteria matching job, e.g., preferred job types/locations */ });
    // for (const user of usersToNotify) {
    //   try {
    //     await axios.post(`${process.env.FRONTEND_URL}/api/email/send`, {
    //       to: user.email,
    //       subject: `New Job Posted - ${newJob.title}`,
    //       body: `Dear ${user.firstName},

    // A new job matching your preferences has been posted:

    // Position: ${newJob.title}
    // Company: ${newJob.company}
    // Location: ${newJob.location}
    // Type: ${newJob.jobType}

    // Click here to view the job: ${process.env.FRONTEND_URL}/jobs/${newJob._id}

    // Best regards,
    // ZIDIOConnect Team
    //       `,
    //     });
    //     console.log(`Job alert email sent to ${user.email}`);
    //   } catch (emailError) {
    //     console.error('Failed to send job alert email:', emailError);
    //   }
    // }

    res.status(201).json(newJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a job by ID (recruiter only, and must be the poster)
router.put('/:id', auth, checkRole(['recruiter']), async (req, res) => {
  try {
    const jobId = req.params.id;
    const updates = req.body;

    const job = await Job.findOneAndUpdate(
      { _id: jobId, postedBy: req.user._id },
      { $set: updates },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ message: 'Job not found or you are not authorized to update it' });
    }

    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a job by ID (recruiter only, and must be the poster)
router.delete('/:id', auth, checkRole(['recruiter']), async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findOneAndDelete({ _id: jobId, postedBy: req.user._id });

    if (!job) {
      return res.status(404).json({ message: 'Job not found or you are not authorized to delete it' });
    }

    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 