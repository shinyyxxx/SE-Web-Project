import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import "./LearingResorces.css";
import { UserContext } from '../../context/userContext';
import { toast } from 'react-hot-toast';
import parse from 'url-parse';
import "../components/Learningheading.css";
import "../components/FormFilter1.css";

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
// Function to get the YouTube video ID from a URL
const getYouTubeVideoId = (url) => {
  const parsedUrl = parse(url, true);
  return parsedUrl.query.v;
};

const LearningResources = () => {
  const { user } = useContext(UserContext);
  const [learningResources, setLearningResources] = useState([]);
  const [newLearningResource, setNewLearningResource] = useState({
    title: "",
    url: "",
    postedBy: "sekmitl", // Set the default postedBy value (you may update this as needed)
    tags: [],
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch learning resources from the backend
    axios
      .get("/api/learning-resources")
      .then((response) => {
        setLearningResources(response.data);
      })
      .catch((error) => console.error("Error fetching learning resources:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLearningResource((prevResource) => ({
      ...prevResource,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setNewLearningResource((prevResource) => {
      const updatedTags = checked
        ? [...prevResource.tags, name]
        : prevResource.tags.filter((tag) => tag !== name);

      return {
        ...prevResource,
        tags: updatedTags,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Submit the new learning resource to the backend
      const response = await axios.post("/api/learning-resources/", newLearningResource);
      const createdResource = response.data;

      // Update the learning resources state with the new resource
      setLearningResources((prevResources) => [...prevResources, createdResource]);

      // Clear the form after successful submission
      setNewLearningResource({
        title: "",
        url: "",
        tags: [],
      });

      console.log("Learning resource created successfully:", createdResource);
      toast.success('Learning Resource Created Successfully!');
    } catch (error) {
      console.error("Error creating learning resource:", error);
      toast.error('An error occurred while creating the learning resource.');
    }
  };

  // Filter learning resources based on the search term
  const filteredResources = learningResources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="learning-resources">
    <header className="page-heading2">
      <div className="searchbar-group">
        <input className="searchbar1" placeholder="Search" type="text" value={searchTerm}
         onChange={(e) => setSearchTerm(e.target.value)} />
        <div className="uni-logo">
          <img className="image-1-icon2" alt="" src="/image-11@2x.png" />
          <div className="se-kmitl1">SE KMITL</div>
        </div>
      </div>
    </header>
    <div className='topPart'>
      <h3>Learning Resources</h3>
    </div>
    <div className='background-container-learning'>
      <main className='videoChoose'>
        {/* Display the form only if the user's email matches the specified one */}
        {user && user.email === 'test@test.test' && (
        <button className="open-button" onClick={openForm}>Upload</button>
        )}

        {user && user.email === "test@test.test" && (
        <div className="form-popup" id="myForm">
          <section className="form-section">
            {/* <form onSubmit={handleSubmit}> */}
            <form action="/action_page.php" className="form-container">
              <h2>Add New Learning Resource</h2>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newLearningResource.title}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="url">Resource URL:</label>
              <input
                type="text"
                id="url"
                name="url"
                value={newLearningResource.url}
                onChange={handleInputChange}
                required
              />

              <label>
                <input
                  type="checkbox"
                  name="recommended"
                  checked={newLearningResource.tags.includes("recommended")}
                  onChange={handleCheckboxChange}
                />
                Recommended
              </label>

              <label>
                <input
                  type="checkbox"
                  name="popular"
                  checked={newLearningResource.tags.includes("popular")}
                  onChange={handleCheckboxChange}
                />
                Popular
              </label>
              <button className="btn" onClick={handleSubmit}>Add Learning Resource</button>
              <button className="btn cancel" onClick={closeForm}>Close</button>
            </form>
          </section>
        </div>
        )}

        {/* Display current learning resources */}
        <section className="frame-wrapper">
          <div className="frame-container">
            <section className="frame-section">
              {filteredResources.map((resource) => (
                <div key={resource._id} className="resource-parent">
                  {/* Use iframe to display the video with the YouTube embed URL */}
                  <iframe
                    title={resource.title}
                    width="300"
                    height="200"
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(resource.url)}`}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                  <div className="title">{resource.title}</div>
                  <div>
                    {resource.tags.includes("recommended") && <span>Recommended</span>}
                    {resource.tags.includes("popular") && <span>Popular</span>}
                  </div>
                </div>
              ))}
            </section>
          </div>
        </section>
      </main>
    </div>
    </div>
  );
};

export default LearningResources;