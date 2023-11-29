import  { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'

import { useCallback } from "react";
import UsernameCard from "./UsernameCard";
import { useNavigate } from "react-router-dom";
import "./SignInForm.css";

const SignInForm = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    email:'',
    password:'',
  })

  const onLoginButtonClick = async (e) => {
    e.preventDefault()
    const {email, password} = data;
    try{
      const {data} = await axios.post('/login', {
         email, 
         password
      });
      if (data.error){
        toast.error(data.error)
      }
      else{
        setData({})
        toast.success("Login Successful, Welcome!")
        navigate('/')
        window.location.reload(false);
      }
    }catch(error) { console.log(error)}
  };

  const onSIGNUPTextClick = useCallback(() => {
    navigate("/register");
  }, [navigate]);

  return (
    <div className="signin">
      <div className="sign-in-parent">
        <h3 className="sign-in">Sign In</h3>
        <div className="top-divider3" />
      </div>
      <div className="inputs">
        <UsernameCard inputValue="Username" inputValueText="Username" type="email" 
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <UsernameCard
          inputValue="Password"
          inputValueText="Password"
          propWidth="427px"
          type="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <div className="frame5">
          <div className="frame6">
            <input className="checkbox" type="checkbox" />
            <div className="remember-me">Remember me?</div>
          </div>
        </div>
        <button className="login-button" onClick={onLoginButtonClick}>
          <div className="login">Login</div>
          <img className="icon" alt="arrowR" src="/icon.svg" />
        </button>
      </div>
      <div className="footer">
        <div className="need-an-account">Need an account?</div>
        <div className="sign-up" onClick={onSIGNUPTextClick}>
          SIGN UP
        </div>
      </div>
    </div>
  );
};
export default SignInForm;
