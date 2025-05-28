const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  resume: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume', // Assuming you have a Resume model
    required: true,
  },
  status: {
    type: String,
    enum: ['applied', 'under review', 'shortlisted', 'rejected', 'interviewing'],
    default: 'applied',
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application; 