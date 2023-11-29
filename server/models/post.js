const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
  },
  author: {
    type: String, // Assuming author is a string (username)
    required: true,
  },
  likes: [
    {
      type: String, // Change the type to String
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
