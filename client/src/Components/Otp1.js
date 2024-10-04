import React, { useState } from 'react';
import './otp.css';
import Welcome from './Welcome';
import { useNavigate } from 'react-router-dom';
import StarBackground from './StarBackground';

export default function OTP1({otp1}) {
    const [otps, setOtp] = useState('');
    const navigate=useNavigate();
    const { otp } = otp1;
    

    const onhandleclick = async (e) => {
        e.preventDefault();
        if (otps != otp) {
            alert("OTP entered is incorrect");
        } else {navigate('/password')};
        }

    const handleChange = (e) => {
        setOtp(e.target.value);
    };

    return (
        <>
        <StarBackground/>
            <div className="containerxx">
                <p className="wel1x">Welcome </p>
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
