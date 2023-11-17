import { useCallback } from "react";
import "antd/dist/antd.min.css";
import { Dropdown, Menu, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./FormFilter.css";

const FormFilter = () => {
  const navigate = useNavigate();

  const onHomeClick = useCallback(() => {
    navigate("/main-page");
  }, [navigate]);

  const onProfileIconClick = useCallback(() => {
    navigate("/profile-page");
  }, [navigate]);

  return (
    <header className="page-heading1">
      <div className="searchbar-parent">
        <input className="searchbar" placeholder="Search" type="text" />
        <Dropdown
          overlay={
            <Menu>
              {[
                { value: "C++" },
                { value: "Python" },
                { value: "Java" },
                { value: "Other" },
              ].map((option, index) => (
                <Menu.Item key={index}>
                  <a onClick={(e) => e.preventDefault()}>
                    {option.value || ""}
                  </a>
                </Menu.Item>
              ))}
            </Menu>
          }
          trigger={["hover"]}
        >
          <Button onClick={(e) => e.preventDefault()}>
            {`Select Tag `}
            <DownOutlined />
          </Button>
        </Dropdown>
        <button className="home" onClick={onHomeClick}>
          <button className="group">
            <img className="vector-icon1" alt="" src="/vector1.svg" />
            <img className="vector-icon2" alt="" src="/vector2.svg" />
          </button>
        </button>
        <button className="profile-icon" onClick={onProfileIconClick} />
      </div>
    </header>
  );
};

export default FormFilter;
