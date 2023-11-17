import "./CardContainer.css";
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'

const CardContainer = () => {
  const {user} = useContext(UserContext)
  return (
    <div className="top">
      <div className="frame1">
        <div className="frame2">
          <img
            className="pngitem-1468281-1-icon"
            alt=""
            src="/pngitem-1468281-1@2x.png"
          />
          <div className="frame3">
            <div className="frame4">
              <h3 className="john-doe">{user.username}</h3>
              <div className="kmitlacth">{user.email}</div>
              <div className="id-65011000">ID: {user.uid}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="gender-male">Gender: {user.gender}</div>
      <div className="birthday-january-1">Birthday: {user.birthday.slice(0,-14)}</div>
      <div className="nicepng-location-pin-png-12898-parent">
        <img
          className="nicepng-location-pin-png-12898-icon"
          alt=""
          src="/nicepng-locationpinpng-1289813-1@2x.png"
        />
        <div className="moo-2">{user.address}</div>
      </div>
      <div className="top-divider2" />
    </div>
  );
};

export default CardContainer;
