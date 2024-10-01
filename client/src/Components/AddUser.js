import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import './UserFile.css'
const AddUser = (user) => {
    const location = useLocation();
    const groupid = location.pathname.slice(9);
    console.log(groupid);
     console.log(user)
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
            body:JSON.stringify({groupid:Number(groupid),user_id:user.user.id})
        })
        const json=await response.json();
        
    }
    return (
         <div className="user-wrapper" style={{width:"100%"}}>
              <div className='contain'>
                <img src={image} className='user-image'></img>
                <span className='user'>{user.user.username}</span>
                <button className='sendreq' onClick={addUsers}>Add to group</button>
            </div>
         </div>
            
       
    )
}

export default AddUser
