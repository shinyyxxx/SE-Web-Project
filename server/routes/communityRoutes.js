// routes/communityRoutes.js

const express = require('express');
const router = express.Router();
const cors = require('cors');
const { createPost, getPosts, likePost, addComment, searchPosts } = require('../controllers/communityController');


router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.post('/posts', createPost);
router.get('/posts', getPosts);
router.post('/posts/:postId/like', likePost);
router.post('/posts/:postId/comments', addComment);
router.get('/posts/search/:tag', searchPosts);

module.exports = router;