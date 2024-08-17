import React, { useState } from 'react'
import './Welcome2.css'
import { Link } from 'react-router-dom'
export default function Password({otp1}) {
  const [credentials,setcredentials]=useState({password:"",cpassword:""})
  const {email}=otp1;
  console.log(email)
  const handlesubmit=async (e)=>{
    e.preventDefault();
    if(credentials.password===credentials.cpassword){
    const url='http://localhost:5000/register/changepass';
        const response = await fetch(url, {
            method: "PUT",
            credentials: 'include',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email:email, password:credentials.password})
          });
          const json= await response.json();
          console.log(json);
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
    console.log(credentials);
}
  return (
    <><div className="containerx">
    <p className="wel1">Welcome To</p>
    <h1 className="heading1">TalkPal</h1>
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
