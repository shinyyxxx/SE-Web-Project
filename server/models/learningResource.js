// models/LearningResource.js

const mongoose = require('mongoose');

const learningResourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  postedBy: {
    type: String, // Assuming the postedBy field is a string (admin email)
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tags: {
    type: Array,
    default: [], // Empty array by default
  },
});

const LearningResource = mongoose.model('LearningResource', learningResourceSchema);

module.exports = LearningResource;