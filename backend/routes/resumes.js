const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const User = require('../models/User'); // Assuming you might need user info
const { auth } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // For file system operations

// Configure multer for file uploads
// You might want to adjust the destination and filename based on your needs and storage strategy
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create a directory for the user if it doesn't exist
    // Using req.user._id requires the auth middleware to run before this.
    const uploadDir = path.join(__dirname, '../uploads/resumes', req.user._id.toString());
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Use original filename with a timestamp to avoid conflicts
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Upload a new resume (student only)
router.post('/', auth, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const user = req.user;
    const { title } = req.body;

    if (!title) {
        // Clean up the uploaded file if title is missing
        fs.unlink(req.file.path, (err) => {
            if (err) console.error('Failed to delete uploaded file:', err);
        });
        return res.status(400).json({ message: 'Resume title is required' });
    }

    const newResume = new Resume({
      user: user._id,
      title,
      fileName: req.file.originalname,
      fileUrl: `/uploads/resumes/${user._id}/${req.file.filename}`, // URL to access the file
    });

    await newResume.save();

    // Optional: Set this as the default resume if it's the first one or requested
    const resumeCount = await Resume.countDocuments({ user: user._id });
    if (resumeCount === 1 || req.body.isDefault === 'true') {
        // Set all other resumes for the user to isDefault: false
        await Resume.updateMany({ user: user._id, _id: { $ne: newResume._id } }, { isDefault: false });
        newResume.isDefault = true;
        await newResume.save();
    }

    res.status(201).json(newResume);

  } catch (error) {
    console.error(error);
    // Clean up the uploaded file in case of other errors
    if (req.file) {
        fs.unlink(req.file.path, (err) => {
            if (err) console.error('Failed to delete uploaded file on error:', err);
        });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all resumes for a user (student only)
router.get('/', auth, async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user._id }).sort({ uploadDate: -1 });
    res.json(resumes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single resume by ID (user must own it)
router.get('/:id', auth, async (req, res) => {
    try {
        const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found or you do not own it' });
        }
        res.json(resume);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Set a resume as default (student only)
router.put('/:id/default', auth, async (req, res) => {
    try {
        const resumeId = req.params.id;
        const userId = req.user._id;

        // Set all other resumes for the user to isDefault: false
        await Resume.updateMany({ user: userId }, { isDefault: false });

        // Set the specified resume to isDefault: true
        const resume = await Resume.findOneAndUpdate(
            { _id: resumeId, user: userId },
            { isDefault: true },
            { new: true }
        );

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found or you do not own it' });
        }

        res.json(resume);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a resume by ID (user must own it)
router.delete('/:id', auth, async (req, res) => {
    try {
        const resumeId = req.params.id;
        const userId = req.user._id;

        const resume = await Resume.findOneAndDelete({ _id: resumeId, user: userId });

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found or you do not own it' });
        }

        // Optional: Delete the physical file
        const filePath = path.join(__dirname, '../uploads/resumes', userId.toString(), path.basename(resume.fileUrl));
        fs.unlink(filePath, (err) => {
            if (err) console.error('Failed to delete physical resume file:', err);
        });

        res.json({ message: 'Resume deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 