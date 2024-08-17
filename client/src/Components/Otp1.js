import React, { useState } from 'react';
import './otp.css';
import Welcome from './Welcome';
import { useNavigate } from 'react-router-dom';

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
            <div className="containerxx">
                <p className="wel1x">Welcome To</p>
                <h1 className="heading1x">TalkPal</h1>
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
