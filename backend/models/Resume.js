const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
  // You might want to store parsed resume data here later
  // skills: [String],
  // experience: String,
  // education: String,
});

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume; 