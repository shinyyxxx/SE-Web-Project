const mongoose = require('mongoose')
const {Schema} = mongoose

const courseSchema = new Schema({
  grade: Number,
  credit: Number,
  coursename: String,
  state: String,
  enrolled: { type: Boolean, default: false }
})

const profileSchema = new Schema({
  username: String,
  gpa: Number,
  course : [courseSchema],
  puzzlesolve: Number
});

const ProfileModel = mongoose.model('Profile', profileSchema);

module.exports = ProfileModel;