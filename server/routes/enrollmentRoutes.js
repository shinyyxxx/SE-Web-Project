// routes/enrollment.js

const express = require('express');
const router = express.Router();
const cors = require('cors');
const { enrollCourse, createCourse, getCourses } = require('../controllers/enrollmentController');

router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
);

router.post('/enroll', enrollCourse);
router.post('/add-course', createCourse);
router.get('/courses', getCourses);

module.exports = router;
