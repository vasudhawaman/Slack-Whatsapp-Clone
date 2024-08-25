import { useState, useEffect } from "react";
import React from 'react'

const EditProfile = () => {
    const [data, setdata] = useState({ image: "", status: "" });
    const [info, setInfo] = useState();
    const [image, setImage] = useState(null);
    useEffect(() => {
        const getUserData = async () => {
            const url = "http://localhost:8000/register/getinfo";
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setInfo(data);
            const { image, filename } = data;
            const arrayBuffer = new Uint8Array(image.data);
            const blob = new Blob([arrayBuffer], { type: filename });
            const fr = new FileReader();
            fr.onload = function () {
                setImage(fr.result);
            };
            fr.readAsDataURL(blob);
            setdata({ status: data.status, image: data.image })
        };
        getUserData();
    }, []);

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('image', data.image);
        form.append('status', data.status);
        const url = "http://localhost:8000/register/updateinfo";
        const response = await fetch(url, {
            method: 'PUT',
            credentials: 'include',
            body: form
        });
        const res = await response.json();
        console.log(res);

        const url2="http://localhost:8000/register/updatestatus";
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
    return (
        <div>
            <div className='cont'>
                <h1 className='user-profile'>User Profile</h1>
                {info ? (
                    <>
                        <img src={ image} className='userImage' alt='User' />
                        <input type='file' id='image' name="image" onChange={e => { setdata({ image: e.target.files[0] }) }} style={{ display: 'none' }} />
                        <label htmlFor='image'>
                            <div className='edit'>Edit profile</div>
                        </label>
                        <h2 className='username'>{info.username}</h2>
                        <div className='user-info' >Email-Id: {info.email}</div>
                        <input className='status' value={data.status} name='status' id="status" onChange={onHandleChange}></input>
                        <button onClick={onHandleSubmit}>Submit</button>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    )
}

export default EditProfile
