// EnrollmentPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/userContext';
import { toast } from 'react-hot-toast';
import './EnrollmentPage.css'

const EnrollmentPage = () => {
  const { user } = useContext(UserContext);

  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    coursename: '',
    grade: 0,
    credit: 0,
    state: '',
  });

  useEffect(() => {
    // Fetch courses from the backend
    axios.get('http://localhost:8000/api/enrollment/courses')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const handleCourseInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();

    try {
      // Submit the new course to the backend
      const response = await axios.post('http://localhost:8000/api/enrollment/add-course', newCourse);
      const createdCourse = response.data;

      // Update the courses state with the new course
      setCourses((prevCourses) => [...prevCourses, createdCourse]);

      // Clear the form after successful submission
      setNewCourse({
        coursename: '',
        grade: 0,
        credit: 0,
        state: '',
      });

      console.log('Course created successfully:', createdCourse);
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

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

  return (
    <div >
      <header className="page-heading">
        <div className="searchbar-group">
          <div className="uni-logo">
            <img className="image-1-icon2" alt="" src="/image-11@2x.png" />
            <div className="se-kmitl1">SE KMITL</div>
          </div>
        </div>
      </header>
      <div className='topPart'>
      <h2>Enrollment Page</h2>

      {/* Form to add a new course */}
      <form onSubmit={handleAddCourse}>
        <label htmlFor="coursename">Course Name:</label>
        <input
          type="text"
          id="coursename"
          name="coursename"
          value={newCourse.coursename}
          onChange={handleCourseInputChange}
          required
        />

        <label htmlFor="grade">Grade:</label>
        <input
          type="number"
          id="grade"
          name="grade"
          value={newCourse.grade}
          onChange={handleCourseInputChange}
          required
        />

        <label htmlFor="credit">Credit:</label>
        <input
          type="number"
          id="credit"
          name="credit"
          value={newCourse.credit}
          onChange={handleCourseInputChange}
          required
        />

        <label htmlFor="state">State:</label>
        <input
          type="text"
          id="state"
          name="state"
          value={newCourse.state}
          onChange={handleCourseInputChange}
          required
        />

        <button type="submit">Add Course</button>
      </form>
      </div>
    <div className='background-container'>
      <div className='listcourse'>
      <div className="table-container">
        <table id='keywords' className='keywords'>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Grade</th>
              <th>Credit</th>
              <th>State</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
        {courses.map(course => (
              <tr key={course._id}>
              <td>{course.coursename}</td>
              <td>{course.grade}</td>
              <td>{course.credit}</td>
              <td>{course.state}</td>
              <td>
                <button className="enroll-button" onClick={() => handleEnroll(course.coursename)}>
                  {user && user.username && course.users.includes(user.username) ? 'Enrolled' : 'Enroll'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  </div>
  </div>
  );
};

export default EnrollmentPage;
