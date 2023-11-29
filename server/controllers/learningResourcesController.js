// controllers/learningResourcesController.js

const LearningResource = require('../models/learningResource');

const createLearningResource = async (req, res) => {
    try {
      const { title, url, postedBy, tags } = req.body;

      const newLearningResource = await LearningResource.create({
        title,
        url,
        postedBy,
        tags,
      });
  
      return res.json(newLearningResource);
    } catch (error) {
      console.error('Error creating learning resource:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const getLearningResources = async (req, res) => {
  try {
    const learningResources = await LearningResource.find().sort({ createdAt: -1 });
    res.status(200).json(learningResources);
  } catch (error) {
    console.error('Error getting learning resources:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { createLearningResource, getLearningResources };
