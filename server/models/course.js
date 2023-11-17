// models/course.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
  coursename: String,
  grade: Number,
  credit: Number,
  state: String,
  // Add a new field to store enrolled users
  users: [
    {
      type: String,
    },
  ]
}, { timestamps: true });

const CourseModel = mongoose.model('Course', courseSchema);

module.exports = CourseModel;
