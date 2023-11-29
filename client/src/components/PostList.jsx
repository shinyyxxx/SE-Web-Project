import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/userContext';
import { toast } from 'react-hot-toast';
import "./PostList.css";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    // Fetch posts from the backend
    axios.get('/api/community/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const [comments, setComments] = useState({}); // Use an object to store comments for each post

  const handleComment = async (e, currentPostId) => {
    e.preventDefault();

    const { commentContent } = comments;

    console.log(comments[currentPostId]?.commentContent, user.username, currentPostId);

    try {
      const response = await axios.post(`/api/community/posts/${currentPostId}/comments`, {
        content: comments[currentPostId]?.commentContent,
        author: user.username,
        post: currentPostId,
      });

      console.log(response);

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setComments({ ...comments, [currentPostId]: { commentContent: '' } }); // Clear the form after successful post
 
        window.location.reload(); // Reload the page
        toast.success('Comment Success!');
        window.location.reload();
      }

      // Optionally, you can perform actions after successful Comment creation here
      console.log('Comment created successfully:', response.data);

    } catch (error) {
      console.error('Error creating Comment:', error);
      toast.error('An error occurred while creating the post.');
    }
  };

  const handleLike = async (postId) => {
    try {
      // Check if the user is defined before accessing user.username
      if (!user || !user.username) {
        // Handle the case where user or user.username is undefined
        console.error('User or username is undefined.');
        return;
      }

      const response = await axios.post(`/api/community/posts/${postId}/like`, {
        username: user.username,
      });

      const updatedPost = response.data;

      setPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === updatedPost._id ? updatedPost : post
        )
      );

      const likeAction = updatedPost.likes.includes(user.username) ? 'Liked' : 'Unliked';
      toast.success(`Post ${likeAction}!`);
    } catch (error) {
      console.error('Error liking post:', error);
      toast.error('An error occurred while liking the post.');
    }
  };

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async () => {
    try {
      // Split the search query by commas
      const searchTags = searchQuery.split(',').map(tag => tag.trim().toLowerCase());

      // Fetch all posts from the backend
      const response = await axios.get('/api/community/posts');
      const allPosts = response.data;

      // Filter posts based on the search query
      const filteredPosts = allPosts.filter(post => {
        const lowerCaseTitle = post.title.toLowerCase();
        const lowerCaseTags = post.tags.toLowerCase();

        // Check if any of the search tags match the title or tags of the post
        return searchTags.some(searchTag =>
          lowerCaseTitle.includes(searchTag) || lowerCaseTags.includes(searchTag)
        );
      });

      setPosts(filteredPosts);
      // Reset comments to prevent inconsistency
      setComments({});
    } catch (error) {
      console.error('Error searching posts:', error);
      toast.error('An error occurred while searching for posts.');
    }
  };

  useEffect(() => {
    // Call handleSearch whenever searchQuery changes
    handleSearch();
  }, [searchQuery]);

  return (
    <div className="container">
      <div className='post-search'>
      <br></br>
      <h2>Community Posts</h2>
      <br></br>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title or tags"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <br></br>
      </div>
      <br></br>
      <ul>
        {posts.map(post => (
          <li key={post._id} className="post">
            <strong className="post-title">{post.title}</strong>
            <p>{post.content}</p>
            <p>{post.tags}</p>
            <p>Author: {post.author}</p>
            <p>Post ID: {post._id}</p>

            <button className="like-button" onClick={() => handleLike(post._id)}>
              {user && user.username && post.likes.includes(user.username) ? 'Liked' : 'Like'} ({post.likes.length})
            </button>

            <form className="comment-form" onSubmit={(e) => handleComment(e, post._id)}>
              <textarea
                className="comment-textarea"
                value={comments[post._id]?.commentContent || ''}
                onChange={(e) => setComments({
                  ...comments,
                  [post._id]: { commentContent: e.target.value },
                })}
              ></textarea>
              <button className="comment-button" type="submit">Create Comment</button>
            </form>

            <ul className="comment-list">
              {post.comments.map(comment => (
                <li key={comment._id} className="comment-item">
                  <p><b> Comment by {comment.author}:</b></p>
                  <p>{comment.content}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
