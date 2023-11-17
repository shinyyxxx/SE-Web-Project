import { useCallback } from "react";
import "antd/dist/antd.min.css";
import { Dropdown, Menu, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./FormFilter1.css";

const FormFilter1 = () => {
  const navigate = useNavigate();

  const onHomeClick = useCallback(() => {
    navigate("/main-page");
  }, [navigate]);

  const onProfileIconClick = useCallback(() => {
    navigate("/profile-page");
  }, [navigate]);

  return (
    <header className="page-heading2">
      <div className="searchbar-group">
        <input className="searchbar1" placeholder="Search" type="text" />
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
        <button className="home1" onClick={onHomeClick}>
          <img className="group-icon" alt="" src="/group.svg" />
        </button>
        <button className="profile-icon1" onClick={onProfileIconClick} />
      </div>
    </header>
  );
};

export default FormFilter1;
