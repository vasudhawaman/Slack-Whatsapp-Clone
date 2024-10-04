import React, { useState } from 'react'
import './Welcome2.css'
import { Link } from 'react-router-dom'
import StarBackground from './StarBackground';
export default function Password({otp1}) {
  const [credentials,setcredentials]=useState({password:"",cpassword:""})
  const {email}=otp1;
  console.log(email)
  const handlesubmit=async (e)=>{
    e.preventDefault();
    if(credentials.password===credentials.cpassword){
    const url=`${process.env.REACT_APP_BACKEND}/register/changepass`;
        const response = await fetch(url, {
            method: "PUT",
            credentials: 'include',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email:email, password:credentials.password})
          });
          const json= await response.json();
          if(json.message){
            alert(json.message)
          }
        }
          else{
            alert("Password and confirm password doesn't matches")
          }
  }
  const handleonchange=(e)=>{
    setcredentials({...credentials,[e.target.name]:e.target.value})
}
  return (
    <>
    <StarBackground/>
    <div className="containerx">
    <p className="wel1">Welcome </p>
    <img src='https://talk-pal-alpha.vercel.app/TalkPal-logo.png' className='heading' height={200} width={200}></img>
    <div className="container1x">
    <p className="user1">Password:</p>
    <input type="password" className="email1" placeholder="Enter your passsword " name="password" onChange={handleonchange} id="Password"></input>
    <p className="user1">Confirm Password:</p>
    <input type="password" className="email1" placeholder="Confirm password" name="cpassword" onChange={handleonchange} id="cpassword"></input>
    <button className="login2" onClick={handlesubmit} type="submit">Change Password</button>
    </div>
    </div>
    </>
  )
}
