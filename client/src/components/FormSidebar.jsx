import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./FormSidebar.css";

const FormSidebar = () => {
  const navigate = useNavigate();

  const onBackButtonClick = useCallback(() => {
    navigate("/main-page");
  }, [navigate]);

  return (
    <div className="sidebar2">
      <div className="head">
        <div className="image-1-parent">
          <img className="image-1-icon1" alt="" src="/image-1@2x.png" />
          <h1 className="se">SE</h1>
        </div>
      </div>
      <div className="search-parent">
        <div className="search">
          <div className="search1">Search</div>
          <input className="search-textbox" type="text" />
        </div>
        <div className="search">
          <div className="search1">Tag</div>
          <input className="search-textbox" type="text" />
        </div>
      </div>
      <button className="backbutton" onClick={onBackButtonClick}>
        <img
          className="svgrepo-iconcarrier"
          alt=""
          src="/svgrepo-iconcarrier.svg"
        />
      </button>
    </div>
  );
};

export default FormSidebar;
