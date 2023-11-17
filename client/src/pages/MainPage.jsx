import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./MainPage.css";

const MainPage = () => {
  const navigate = useNavigate();

  const onProfileContainerClick = useCallback(() => {
    navigate("/pfp");
  }, [navigate]);

  const onCommunityButtonClick = useCallback(() => {
    navigate("/community");
  }, [navigate]);

  const onLearningResourceButtonClick = useCallback(() => {
    navigate("/learning-resources");
  }, [navigate]);

  const onEnrollmentButtonClick = useCallback(() => {
    navigate("/enrollment");
  }, [navigate]);

  return (
    <div className="main-page">
      <header className="page-heading">
        <div className="unilogo">
          <img className="image-1-icon" alt="" src="/image-11@2x.png" />
          <div className="se-kmitl">SE KMITL</div>
        </div>
        <div className="profile" onClick={onProfileContainerClick}>
          <button className="pngitem-1468281-1" />
        </div>
      </header>
      <section className="unleash-your-code-ignite-comm-parent">
        <div className="unleash-your-code">
          Unleash Your Code, Ignite Community Connections
        </div>
        <div className="crafting-job-boards">
          Crafting Job Boards and Coding Exercises with Precision.
        </div>
        <div className="crafting-job-boards">
          Your Code, Your Community, Your Digital Future – Unleash the
          Possibilities.
        </div>
      </section>
      <section className="frame-parent2">
        <div className="communitypicture-parent">
          <img
            className="communitypicture-icon"
            alt=""
            src="/communitypicture@2x.png"
          />
          <div className="asking-questions-from">
            Asking questions from various Software developer!
          </div>
          <button className="community-button" onClick={onCommunityButtonClick}>
            <div className="join-our-community">Join Our Community!</div>
          </button>
        </div>
        <div className="learningpicture-parent">
          <img
            className="communitypicture-icon"
            alt=""
            src="/learningpicture@2x.png"
          />
          <div className="searching-for-videos">
            Searching for videos and topic that you interested in!
          </div>
          <button
            className="learning-resource-button"
            onClick={onLearningResourceButtonClick}
          >
            <div className="join-our-community">Learning Resources</div>
          </button>
        </div>
        <div className="learningpicture-parent">
          <img
            className="communitypicture-icon"
            alt=""
            src="/jobpicture@2x.png"
          />
          <div className="searching-for-videos">
          Embark on a transformative learning journey with our diverse range of courses designed to empower and inspire!
          </div>
          <button className="job-board-button" onClick={onEnrollmentButtonClick}>
            <div className="job-board1">Course Enrollment</div>
          </button>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
