import { useMemo } from "react";
import "./UsernameCard.css";

const UsernameCard = ({ inputValue, inputValueText, propWidth, value, type, onChange }) => {
  const usernameTextboxStyle = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  return (
    <div className="username">
      <div className="username-label">
        <div className="username1">{inputValue}</div>
      </div>
      <input
        className="username-textbox"
        placeholder={inputValueText}
        type={type}
        style={usernameTextboxStyle}
        value={value}
        onChange={onChange}
      />  
    </div>
  );
};
export default UsernameCard;