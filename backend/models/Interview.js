const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
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
  interviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming interviewer is also a User
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['online', 'onsite'],
    required: true,
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled',
  },
  location: {
    type: String,
  },
  meetingLink: {
    type: String,
  },
  notes: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview; 