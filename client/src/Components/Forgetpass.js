import React, { useState } from 'react'
import './Welcome2.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import StarBackground from './StarBackground'

export default function ForgetPass({ setotp }) {
    const navigate = useNavigate()
    const [credentials, setcredentials] = useState({ email: "" })
    const handlesubmit = async (e) => {
        e.preventDefault();
        const url = `${process.env.REACT_APP_BACKEND}/register/checkmail`;
        const response = await fetch(url, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email })
        });
        const json = await response.json();
        if (json.message === 'success') {
            setotp({ otp: json.otp, email: credentials.email })
            navigate('/otp1')
        }
    }
    const handleonchange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
        
    }
    return (
        <><StarBackground/><div className="containerx">
            <p className="wel1">Change password</p>
            <img src='Talkpal-logo.png' className='heading' height={200} width={200}></img>
            <div className="container1x">
                <p className="user1">Email</p>
                <input type="text" className="email1" placeholder="Enter your email " name="email" onChange={handleonchange} id="email"></input>
                <button className="login" onClick={handlesubmit} type="submit">Send OTP</button>
            </div>
        </div>



        </>
    )
}
