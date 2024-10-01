import React, { useState } from 'react'
import './UserFile.css'
const UserFile = ({ user }) => {
  const [image, setImage] = useState("https://static.vecteezy.com/system/resources/previews/000/574/512/original/vector-sign-of-user-icon.jpg");
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
  const handleonclick = async () => {
    console.log(user.id)
    const url = `${process.env.REACT_APP_BACKEND}/register/connection`
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ receiver: user.id })
    })
    const json = await response.json();
    console.log(json);
  }
  return (
    <div>
      <div className='containxx'>
        <img src={image} className='user-image'></img>
        <span className='user'>{user.username}</span>
        <button className='sendreq' onClick={handleonclick}>Connect</button>
      </div>
    </div>
  )
}

export default UserFile
