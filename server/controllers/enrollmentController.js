// controllers/enrollmentController.js

const Profile = require('../models/profile');
const Course = require('../models/course');

const likePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const username = req.body.username;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).send('Post not found');
    }

    if (!post.likes.includes(username)) {
      post.likes.push(username);
    } else {
      post.likes = post.likes.filter(like => like !== username);
    }

    await post.save();

    // Fetch the post with populated comments and send it back
    const updatedPost = await Post.findById(postId).populate('comments');

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).send('Internal Server Error');
  }
};

const enrollCourse = async (req, res) => {
  try {
    const { coursename, username } = req.body;

    const course = await Course.findOne({ coursename });

    if (!course) {
      return res.status(404).send('Course not found');
    }

    if (!course.users.includes(username)) {
      course.users.push(username);
    } else {
      course.users = course.users.filter(user => user !== username);
    }

    await course.save();

    // Fetch the course with populated users and send it back
    const updatedCourse = await Course.findOne({ coursename }).populate('users');

    res.status(200).json(updatedCourse);
  } catch (error) {
    console.error('Error enrolling in the course:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const createCourse = async (req, res) => {
  try {
    const { coursename, grade, credit, state } = req.body;

    const newCourse = await Course.create({
      coursename,
      grade,
      credit,
      state,
      users: [], // Initialize the users array for the course
    });

    return res.json(newCourse);
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error getting courses:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { enrollCourse, createCourse, getCourses };
