import React, { useEffect, useState } from 'react'

const AddUser = (user, groupid) => {
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
        
        const url = "http://localhost:8000/register/adduser";
        const response = await fetch(url, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({groupid:user.groupid,user_id:user.user.id})
        })
        const json=await response.json();
        console.log(json);
    }
    return (
        <div>
            <div className='contain'>
                <img src={image} className='user-image'></img>
                <span className='user'>{user.user.username}</span>
                <button className='sendreq' onClick={addUsers}>Add to group</button>
            </div>
        </div>
    )
}

export default AddUser
