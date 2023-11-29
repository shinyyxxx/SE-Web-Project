// pages/Community.jsx

import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { UserContext } from '../../context/userContext';
import PostList from '../components/PostList';
import './Community.css'
import "../components/Learningheading.css";
import "../components/FormFilter1.css";
import "./LearingResorces.css";

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

const Community = () => {
  const { user } = useContext(UserContext);

  const [postData, setPostData] = useState({
    title: '',
    content: '',
    tags: '',
  });

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/community/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    const { title, content, tags } = postData;

    console.log(postData);
    console.log(user);

    try {
      const response = await axios.post('/api/community/posts', {
        title,
        content,
        tags,
        author: user.username, // Include user.username as author
      });

      console.log(response);

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setPostData({ title: '', content: '', tags: '' }); // Clear the form after successful post
        toast.success('Post Success!');
        window.location.reload();
      }

      // Optionally, you can perform actions after successful post creation here
      console.log('Post created successfully:', response.data);

    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('An error occurred while creating the post.');
    }
  };

  return (
    
    <div>
      <header className="page-heading">
        <div className="searchbar-group">
          <div className="uni-logo">
            <img className="image-1-icon2" alt="" src="/image-11@2x.png" />
            <div className="se-kmitl1">SE KMITL</div>
          </div>
        </div>
      </header>
      <div className='background-container-commu'>
      <button id='commubtn' className="open-button" onClick={openForm}>Create Post</button>
      <div className="form-popup" id="myForm">
        <form action="/action_page.php" className="form-container">
          <h2>Create a New Post</h2>

          <label for="email"><b>Title</b></label>
          <input type="text" placeholder="Enter Title" 
          name="title" 
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          required></input>

          <label for="psw"><b>Content</b></label>
          <input type="text" placeholder="Enter Content" name="psw" required
          value={postData.content}
          onChange={(e) => setPostData({ ...postData, content: e.target.value })}
          ></input>

          <label for="psw"><b>Tags</b></label>
          <input type="text" placeholder="Enter tags" name="content" required
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
          ></input>

          <button type="submit" className="btn" onClick={handlePostSubmit}>Create Post</button>
          <button type="button" className="btn cancel" onClick={closeForm}>Close</button>
        </form>
      </div>
        <PostList posts={posts} />
      </div>
    </div>
  );
};

export default Community;