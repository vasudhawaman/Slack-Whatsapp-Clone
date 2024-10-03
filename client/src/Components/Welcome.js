import React, { useState } from 'react';
import './welcome.css';
import Terms from './Terms';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import StarBackground from './StarBackground';
const Welcome = ({ setOtpState }) => {

    const [isChecked, setIsChecked] = useState(false);
    const [credentials, setcredentials] = useState({ username: "", password: "", email: "", cpassword: "" })
    const navigate = useNavigate();
    const handleOnchange = (event) => {
        setIsChecked(event.target.checked);
    };

    const handleOnClick = async (e) => {
        if (!isChecked) {
            alert('Please agree terms and condition');
        }

        else {

            if (credentials.password === credentials.cpassword) {
                const url = `${process.env.REACT_APP_BACKEND}/register/cheak`;
                const response = await fetch(url, {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username: credentials.username, password: credentials.password, email: credentials.email })
                });
                const json = await response.json();
                const { okay, otp } = json;
                console.log(json);
                console.log(okay === 123);
                if (okay === 123) {
                    setOtpState({ credentials: credentials, otp: otp });
                    navigate('/otp')
                }
                else {
                    alert("Unexpected response from server");
                }
            }
            else {
                alert("Confirm password and passowrd doesnt matches")
            }
        }
    };
    const handleOnClick2 = () => {
        window.location.href = `${process.env.REACT_APP_BACKEND}/auth/google`;
    }
    const handleOnChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
        console.log(credentials);
    }
    return (
        <>
        <StarBackground/>
            <div className="container">
                {/* 
                 */}
                <p className="wel">Welcome </p>
                <img src='./Talkpal-logo.png' className='heading' height={200} width={200}></img>
                {/* <h1 className="heading">TalkPal</h1> */}
                <div className="container1">
                    <p className="user">Enter your email:</p>
                    <input type="text" className="email" placeholder="Enter your email id" name="email" onChange={handleOnChange}></input>
                    <p className="user">Password:</p>
                    <input type="password" className="email" placeholder="Enter password" name="password" onChange={handleOnChange}></input>
                    <p className="user">Confirm Password</p>
                    <input type="password" className="email" placeholder="Confirm your password " name="cpassword" onChange={handleOnChange}></input>
                    <p className="user">Username:</p>
                    <input type="text" className="email" placeholder="Decide the username " name="username" onChange={handleOnChange}></input>
                    <input type="checkbox" className='tandc' onChange={handleOnchange}></input> I agree <a href="/t&c">terms and condition</a>

                    <div className="log">
                        <button className="login" onClick={handleOnClick} >Sign Up</button>
                    </div>
                </div>

                <div className='goog'><Link to={`${process.env.REACT_APP_BACKEND}/auth/google`}><button className='google' onClick={handleOnClick2} >Sign up with google</button></Link></div>
                <p className="ask" style={{color:'white'}}>Already have an account?<a href="/signin">Login</a></p>
            </div>
        </>
    );
}

export default Welcome;
