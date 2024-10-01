import { useState, useEffect } from "react";
import React from 'react'
import StarBackground from "./StarBackground";
import './User.css';
const EditProfile = () => {
    const [data, setdata] = useState({ image: "", status: "" });
    const [info, setInfo] = useState();
    const [image, setImage] = useState("https://static.vecteezy.com/system/resources/previews/000/574/512/original/vector-sign-of-user-icon.jpg");
    useEffect(() => {
        const getUserData = async () => {
            const url = `${process.env.REACT_APP_BACKEND}/register/getinfo`;
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setInfo(data);
            setdata({status: data.status})
            if(data.image){
            const { image, filename } = data;
            const arrayBuffer = new Uint8Array(image.data);
            const blob = new Blob([arrayBuffer], { type: filename });
            const fr = new FileReader();
            fr.onload = function () {
                setImage(fr.result);
            };
            fr.readAsDataURL(blob);
            setdata({ status: data.status, image: data.image })
        }
        };
        getUserData();
    }, []);

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('image', data.image);
        form.append('status', data.status);
        const url = `${process.env.REACT_APP_BACKEND}/register/updateinfo`;
        const response = await fetch(url, {
            method: 'PUT',
            credentials: 'include',
            body: form
        });
        const res = await response.json();
        console.log(res);

        const url2=`${process.env.REACT_APP_BACKEND}/register/updatestatus`;
        const response2=await fetch(url2,{
            method:'PUT',
            credentials: 'include',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({status:data.status})
        })
        const res2=await response2.json();
        console.log(res2);
    };

    const onHandleChange = (e) => {
        const { name, value } = e.target;
        setdata({ ...data, [name]: value })
        console.log(data)
    }
    const onLogout=async()=>{
        const url = `${process.env.REACT_APP_BACKEND}/register/logout`;
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers:{
                'Content-Type': 'application/json'
            }
        });
        console.log("hello");
        const data = await response.json();
        console.log(data);
        window.location.href = '/register';
    }
    return (
        <div>
            <StarBackground/>
            <div className='cont'>
                {info ? (
                    <>
                        <img src={ image} className='userImage' alt='User' />
                        <img src={ image} className='userImage1' alt='User' />
                        <input type='file' id='image' name="image" onChange={e => { setdata({ image: e.target.files[0] }) }} style={{ display: 'none' }} />
                        <label htmlFor='image'>
                            <div className='edit' style={{ boxShadow: 'rgb(143, 54, 252) 0px 48px 100px 0px' }}>Edit profile</div>
                        </label>
                        <h2 className='username'>{info.username}</h2>
                        <div className='user-info' >Email-Id: {info.email}</div>
                        <input className='status' value={data.status} name='status' id="status" onChange={onHandleChange}></input>
                        <button onClick={onHandleSubmit} className="edit">Submit</button>
                        <button onClick={onLogout} className="edit">Logout</button>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    )
}

export default EditProfile
