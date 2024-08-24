import React from 'react'
import './UserFile.css'
const UserFile = ({user}) => {
    const handleonclick=async ()=>{
        console.log(user.id)
        const url='http://localhost:8000/register/connection'
        const response= await fetch(url,{
            method:'POST',
            credentials: 'include',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({receiver:user.id})
        })
            const json=await response.json();
            console.log(json);
    }
  return (
    <div>
      <div className='contain'>
        <img src={user.image} className='user-image'></img>
        <span className='user'>{user.username}</span>
        <button className='sendreq' onClick={handleonclick}>Connect</button>
      </div>
    </div>
  )
}

export default UserFile
