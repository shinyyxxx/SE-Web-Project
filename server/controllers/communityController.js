// controllers/communityController.js

const Post = require('../models/post');
const Comment = require('../models/comment');

const createPost = async (req, res) => {
  try {
    const { title, content, tags, author  } = req.body;

    const newPost = await Post.create({
      title,
      content,
      tags,
      author
    });

    return res.json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate('comments');
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error getting posts:', error);
    res.status(500).send('Internal Server Error');
  }
};

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

const addComment = async (req, res) => {
  try {
    const { content, author, post } = req.body;

    const newComment = await Comment.create({
      content,
      author,
      post
    });

    // Find the corresponding post and update the comments array
    const updatedPost = await Post.findByIdAndUpdate(post, {
      $push: { comments: newComment._id }
    }, { new: true });

    return res.json(newComment);
  } catch (error) {
    console.error('Error adding comments:', error);
    res.status(500).send('Internal Server Error');
  }
};


const searchPosts = async (req, res) => {
  try {
    const tag = req.params.tag;
    const posts = await Post.find({ tags: tag }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error searching posts:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { createPost, getPosts, likePost, addComment, searchPosts };