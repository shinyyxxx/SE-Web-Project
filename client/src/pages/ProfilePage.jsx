import { useState, useCallback, useEffect, useContext } from "react";
import { UserContext } from '../../context/userContext'
import CardContainer from "../components/CardContainer";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import "./ProfilePage.css";

const ProfilePage = () => {
  const { user } = useContext(UserContext);
  // Check if user is null or undefined
  if (!user) {
    // You can redirect to the login page or render a loading state
    return <div>Loading...</div>;
  }

  const [courses, setCourses] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // Track if in editing mode

  console.log(user);

  const [editedUser, setEditedUser] = useState({
    username: user.username || '',
    editedId: user.uid || '',
    gender: user.gender || '',
    birthday: user.birthday || '',
    address: user.address || '',
    email: user.email || '',
    description: user.description || '',
    profilepicture: user.profilepicture || '',
  });

  console.log("Edited User:", editedUser);

  useEffect(() => {
    // Fetch courses from the backend
    axios.get('http://localhost:8000/api/enrollment/courses')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

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

  const handleEnroll = async (coursename) => {
    try {
      // Check if the user is defined before accessing user.username
      if (!user || !user.username) {
        // Handle the case where user or user.username is undefined
        console.error('User or username is undefined.');
        return;
      }

      // Make an API request to enroll/unenroll in the selected course
      const response = await axios.post('http://localhost:8000/api/enrollment/enroll', {
        coursename,
        username: user.username,
      });

      const updatedCourse = response.data;

      setCourses(prevCourses =>
        prevCourses.map(course =>
          course._id === updatedCourse._id ? updatedCourse : course
        )
      );

      const enrollAction = updatedCourse.users.includes(user.username) ? 'Enrolled' : 'Enroll';
      toast.success(`Course ${enrollAction} successfully!`);
    } catch (error) {
      console.error('Error enrolling course:', error);
      toast.error('An error occurred while enrolling course.');
      // Handle error, show a message, etc.
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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      // Make an API request to update the user with edited data
      console.log(editedUser);
      const response = await axios.put(`http://localhost:8000/${user.id}`, editedUser);
      console.log(response.data);
      const updatedUser = response.data;
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user:', error);
      // Handle error, show a message, etc.
    }
  };

  const handleCancel = () => {
    // Reset the editedUser to the current user data
    setEditedUser({
      username: user.username,
      id: user.id,
      gender: user.gender,
      birthday: user.birthday,
      address: user.address,
      email: user.email,
      description: user.description,
      profilepicture: user.profilepicture,
    });
    setIsEditing(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // You can perform additional checks or processing on the file if needed
    setEditedUser((prevUser) => ({
      ...prevUser,
      profilepicture: file,
    }));
  };

  const logout = async () => {
    try {
      // Send a POST request to the logout endpoint
      const response = await axios.post('/logout', {}, { withCredentials: true });

      if (response.status === 200) {
        // Redirect to the login page or perform other actions
        window.location.href = '/login'; // Replace with your login page URL
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Check if user is null or undefined
  if (!user) {
    // You can redirect to the login page or render a loading state
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page ">
      <section className="topsection-parent">
        <div className="topsection">
          <div className="container-parent">
            <div className="inner">
              <div className="container-inner">
                <h3 className="TableTitle">Enrolled Courses</h3>
                <div className="top-divider" />
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Grade</th>
                      <th>Credit</th>
                      <th>State</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses
                      .filter(
                        (course) =>
                          user &&
                          user.username &&
                          course.users.includes(user.username)
                      )
                      .map((course) => (
                        <tr key={course._id} className="post">
                          <td className="post-title">{course.coursename}</td>
                          <td>{course.grade}</td>
                          <td>{course.credit}</td>
                          <td>{course.state}</td>
                          <td>
                            <button
                              className="enroll-button"
                              onClick={() => handleEnroll(course.coursename)}
                            >
                              Enrolled
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="frame-parent"></div>
            </div>
          </div>
          <div className="container-parent">
            <div className="inner">
              <div className="container-inner">
                <h3 className="TableTitle">Community Posts</h3>
                <div className="top-divider" />
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Tags</th>
                      <th>Author</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts
                      .filter(
                        (post) =>
                          user && user.username && post.author === user.username
                      )
                      .map((post) => (
                        <tr key={post._id} className="post">
                          <td className="post-title">{post.title}</td>
                          <td>{post.tags}</td>
                          <td>{post.author}</td>
                          <td>
                            <button
                              className="like-button"
                              onClick={() => handleLike(post._id)}
                            >
                              {user &&
                              user.username &&
                              post.likes.includes(user.username)
                                ? "Liked"
                                : "Like"}{" "}
                              ({post.likes.length})
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="inner-child" />
            </div>
          </div>
        </div>
      </section>
      <div className="sidebar">
        <div className="top flex-1">
          <button
            className="edit-user"
            onClick={isEditing ? handleSave : handleEdit}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={logout}>Logout</button>
          <div className="gender-male  h-32 justify-between items-start">
            {isEditing ? (
              <div>
                <p>Profile Image:</p>
                <img
                  className="pngitem-1468281-1-icon"
                  alt=""
                  src={
                    editedUser.profilePicture
                      ? URL.createObjectURL(editedUser.profilePicture)
                      : "/pngitem-1468281-1@2x.png"
                  }
                />
                <input
                  type="file"
                  className="user-image"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={!isEditing}
                />
                <p>Username:</p>
                <input
                  type="text"
                  value={editedUser.username}
                  onChange={(e) =>
                    setEditedUser({
                      ...editedUser,
                      username: e.target.value,
                    })
                  }
                />
                <p>Email:</p>
                <input
                  type="text"
                  value={editedUser.email}
                  onChange={(e) =>
                    setEditedUser({
                      ...editedUser,
                      email: e.target.value,
                    })
                  }
                />
                <p>ID:</p>
                <input
                  type="text"
                  value={user.id}
                  onChange={(e) =>
                    setEditedUser({
                      ...editedUser,
                      editedId: e.target.value,
                    })
                  }
                />
                <p>Edit</p>
                Gender:
                <input
                  type="text"
                  value={editedUser.gender}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, gender: e.target.value })
                  }
                />
                Birthday:
                <input
                  type="text"
                  value={editedUser.birthday}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, birthday: e.target.value })
                  }
                />
                About:
                <textarea
                  value={editedUser.description}
                  onChange={(e) =>
                    setEditedUser({
                      ...editedUser,
                      description: e.target.value,
                    })
                  }
                />
                Address:
                <input
                  type="text"
                  value={editedUser.address}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, address: e.target.value })
                  }
                />
              </div>
            ) : (
              <div className="flex flex-col h-32 ">
                <div className="flex flex-row mb-6">
                  <div className="w-16 h-16">
                    <img
                      src="/pngitem-1468281-1@2x.png"
                      alt=""
                      className="w-full h-full object cover"
                    />
                  </div>
                  <h3 className="font-bold text-3xl  text-start ">
                    {editedUser.username}
                  </h3>
                </div>
                <div className="space-y-3">
                  <p>{editedUser.email}</p>
                  <p>ID: {user.id}</p>
                  <p>Gender: {editedUser.gender}</p>
                  <p>Birthday: {editedUser.birthday.slice(0, -14)}</p>
                  <p>About: {editedUser.description}</p>
                  <div className="flex space-x-4 items-center justify-start mt-8">
                    <img
                      alt=""
                      src="/nicepng-locationpinpng-1289813-1@2x.png"
                      className="nicepng-location-pin-png-12898-icon"
                    />
                    <p>{editedUser.address}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;