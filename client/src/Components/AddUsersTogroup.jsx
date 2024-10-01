import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import './Chatlog.css'
const AddUser = (user) => {
    const location = useLocation();
    const groupid = location.pathname.slice(9);
    const [image, setImage] = useState("https://static.vecteezy.com/system/resources/previews/000/574/512/original/vector-sign-of-user-icon.jpg");
    if (user.user.image != null) {
        const { image, filename } = user.user;
        const arrayBuffer = new Uint8Array(image.data);
        const blob = new Blob([arrayBuffer], { type: filename });
        const fr = new FileReader();
        fr.onload = function () {
            setImage(fr.result);
        };
        fr.readAsDataURL(blob);
    }
    const addUsers = async () => {

        const url = `${process.env.REACT_APP_BACKEND}/register/adduser`;
        const response = await fetch(url, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ groupid: Number(groupid), user_id: user.user.id })
        })
        const json = await response.json();
    }
    return (
        
        <div>
            <div className="chatlog" >

                <div className='imgProfile'>
                    <img src={image} height="30px" width="30px" style={{ borderRadius: "100%" }} />
                </div>
                <div className='information'>
                    <h1>{user.user.username}</h1>
                </div>
                <div className="unread">
                <button className='sendreq' onClick={addUsers}>Add to group</button>
                </div>
                
            </div>
        </div>
    )
}

export default AddUser
