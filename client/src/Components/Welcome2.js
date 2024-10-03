import React, { useState } from 'react'
import './Welcome2.css'
import { Link } from 'react-router-dom'
import StarBackground from './StarBackground'
export default function Welcome2() {
  const [credentials,setcredentials]=useState({username:"",password:""})
  const handlesubmit=async (e)=>{
    e.preventDefault();
    const url=`${process.env.REACT_APP_BACKEND}/register/login`;
        const response = await fetch(url, {
            method: "POST",
            credentials: 'include',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username:credentials.username, password:credentials.password})
          });
          const json= await response.json();
          console.log(json);
          if(json.message==='success'){
            window.location.href='/'
          }else{
            alert('Invalid credentials')
          }
  }
  const handleonchange=(e)=>{
    setcredentials({...credentials,[e.target.name]:e.target.value})
    console.log(credentials);
}
  return (
    <>
    <StarBackground/>
    <div className="containerx">
    <p className="wel">Welcome </p>
    <img src='./Talkpal-logo.png' className='heading' height={200} width={200}></img>
    <div className="container1x">
    <p className="user1">Username</p>
    <input type="text" className="email1" placeholder="Enter your username " name="username" onChange={handleonchange} id="username"></input>
    <p className="user1">Password:</p>
    <input type="password" className="email1" placeholder="Enter password" name="password" onChange={handleonchange} id="password"></input>
    {/* <div className="log"> */}
    <button className="login1" onClick={handlesubmit} type="submit">Login</button>
    {/* </div> */}
    </div>
    <div className='forget'><Link to='/forget'>Forget Password?</Link></div>
    <div className='goog'><Link to={`${process.env.REACT_APP_BACKEND}/auth/google`}><button className='google1'>Sign in with google</button></Link></div>
    <p className="ask1" style={{color:'white'}}>Don't have an account?<a href="/register">Sign up</a></p>
    </div>
    

    
    </>
  )
}
