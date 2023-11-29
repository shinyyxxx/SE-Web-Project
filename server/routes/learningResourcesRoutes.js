// routes/learningResourcesRoutes.js

const express = require('express');
const router = express.Router();
const cors = require('cors');
const { getLearningResources, createLearningResource } = require('../controllers/learningResourcesController');

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.get('/', getLearningResources);
router.post('/', createLearningResource);

module.exports = router;