import React, { useState } from 'react'
import './Chatlog.css'
const MemberOfGroup = ({ user, groupid }) => {
    const [image, setImage] = useState("https://static.vecteezy.com/system/resources/previews/000/574/512/original/vector-sign-of-user-icon.jpg");
    console.log(groupid)
    if (user.image != null) {
        const { image, filename } = user;
        const arrayBuffer = new Uint8Array(image.data);
        const blob = new Blob([arrayBuffer], { type: filename });
        const fr = new FileReader();
        fr.onload = function () {
            setImage(fr.result);
        };
        fr.readAsDataURL(blob);
    }

    const removeFromGroup = async () => {
        const url = "http://localhost:8000/register/remove";
        const response = await fetch(url, {
            method: "DELETE",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: user.id,
                groupid: groupid
            })
        })
        const json = await response.json();
        console.log(json);
    }
    return (
        <div>
        <div className="chatlog" >
            <div className='imgProfile'>
                <img src={image} height="30px" width="30px" style={{ borderRadius: "100%" }} />
            </div>
            <div className='information'>
                <h1>{user.username}</h1>
            </div>
        </div>
    </div>

    )
}

export default MemberOfGroup
