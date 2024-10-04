import React, { useState } from 'react';
import './otp.css';
import Welcome from './Welcome';
import { useNavigate } from 'react-router-dom';
import StarBackground from './StarBackground';

export default function OTP({otpState}) {
    const [otps, setOtp] = useState('');
    const { credentials, otp } = otpState;
    const Navigate=useNavigate()

    const onhandleclick = async (e) => {
        e.preventDefault();
        if (otps != otp) {
            alert("OTP entered is incorrect");
        } else {
            const url = `${process.env.REACT_APP_BACKEND}/register/signup`;
            const response = await fetch(url, {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: credentials.username, password: credentials.password, email: credentials.email })
            });
            const json = await response.json();
            if(json.message==='success'){
                Navigate('/')
            }
            else{
                alert(json.message)
            }
        }
    };

    const handleChange = (e) => {
        setOtp(e.target.value);
    };

    return (
        <>
        <StarBackground/>
            <div className="containerxx">
                <p className="wel1x">Welcome</p>
                <img src='https://talk-pal-alpha.vercel.app/TalkPal-logo.png' className='heading' height={200} width={200}></img>
                <div className="container1xx">
                    <p className="user1">OTP</p>
                    <input
                        type="text"
                        className="email1x"
                        placeholder="Enter the OTP you got on email"
                        name="username1"
                        id="username1"
                        onChange={handleChange}
                    />
                    <button className="loginx" type="submit" onClick={onhandleclick}>Login</button>
                </div>
            </div>
        </>
    );
}
