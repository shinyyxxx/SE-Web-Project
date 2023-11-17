import  { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'

import { useCallback } from "react";
import UsernameCard from "./UsernameCard";
import { useNavigate } from "react-router-dom";
import "./SignUpFormContainer.css";


const SignUpFormContainer = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    id:'',
    gender:'',
    birthday:'',
    address:'',
    email: '',
    password:'',
    cpassword: '',
  })

  const Gotologin = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const onSIGNINTextClick = async(e) => {
    e.preventDefault()
    const {email, username, password, cpassword ,id, gender, birthday, address} = data
    try{
      const {data} = await axios.post('/register', {
        email, username, password, cpassword ,id , gender, birthday, address
        });
        if (data.error) {
          toast.error(data.error)
        }
        else {
          setData({})
          toast.success('Sign Up Successful!')
          navigate('/login') //send them to login
        }
      }catch (error) { console.log(error)}
    }

    // const registerUser = async(e) => {
    //   e.preventDefault()
    //   const {username, id, gender, birthday, address, email, password, cpassword} = data
    //   try{
    //     const {data} = await axios.post('/register', {
    //         username, id, gender, birthday, address, email, password, cpassword
    //       });
    //       if (data.error) {
    //         toast.error(data.error)
    //       }
    //       else {
    //         setData({})
    //         toast.success('Sign Up Successful!')
    //         navigate('/login') //send them to login
    //       }
    //   }catch (error) { console.log(error)}
    // }
  return (
    <div className="signup">
      <div className="sign-up-parent">
        <h3 className="sign-up1">Sign Up</h3>
        <div className="top-divider4" />
      </div>
      <div className="inputs1">
        <UsernameCard
          inputValue="Username"
          inputValueText="Username"
          propWidth="427px"
          type="username"
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />
        <UsernameCard
          inputValue="ID"
          inputValueText="ID"
          propWidth="427px"
          type="id"
          value={data.id}
          onChange={(e) => setData({ ...data, id: e.target.value })}
        />
        <UsernameCard
          inputValue="Gender"
          inputValueText="Gender"
          propWidth="427px"
          type="gender"
          value={data.gender}
          onChange={(e) => setData({ ...data, gender: e.target.value })}
        />
        <UsernameCard
          inputValue="Birthday"
          inputValueText="Birthday"
          propWidth="427px"
          type="date"
          value={data.birthday}
          onChange={(e) => setData({ ...data, birthday: e.target.value })}
        />
        {/* <div className="username">
          <div className="username-label">
            <div className="username1">Birthday</div>
          </div>
          <input
            className="username-textbox"
            placeholder="MM/DD/YYYY"
            type="date"
            lang='fr-CA'
            style={{ width: '427px' }}
            value={data.birthday}
            onChange={(e) => setData({ ...data, birthday: e.target.value })}
          />  
        </div> */}
        <UsernameCard
          inputValue="Address"
          inputValueText="Address"
          propWidth="427px"
          type="address"
          value={data.address}
          onChange={(e) => setData({ ...data, address: e.target.value })}
        />
        <UsernameCard
          inputValue="Email"
          inputValueText="Email"
          propWidth="427px"
          type="email"
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
        <UsernameCard
          inputValue="Confirm Password"
          inputValueText="Confirm Password"
          propWidth="427px"
          type="password"
          value={data.cpassword}
          onChange={(e) => setData({ ...data, cpassword: e.target.value })}
        />
      </div>
      <button className="signup-button" type='submit' onClick={onSIGNINTextClick}>
        <div className="sign-up2">Register</div>
        <img className="icon1" alt="" src="/icon.svg" />
      </button>
      <div className="footer1">
        <div className="already-have-an">Already have an account?</div>
        <div className="sign-in1" onClick={Gotologin}>
          SIGN IN
        </div>
      </div>
    </div>
  );
};

export default SignUpFormContainer;