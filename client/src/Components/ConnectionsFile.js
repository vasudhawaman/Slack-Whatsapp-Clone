import React from 'react'
import './UserFile.css'
const ConnectionFile = ({user}) => {
    console.log(user)
    const handleonclick=async ()=>{
        const url='http://localhost:8000/register/createroom';
        const response=await fetch(url,{
            method:'POST',
            credentials:'include',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({receiver:user.id})
        })
        const res=await response.json();
        console.log(res);
    }
    const handleonreject=async()=>{
        const url='http://localhost:8000/register/reject';
        const response= await fetch(url,{
            method:'DELETE',
            credentials:'include',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({receiver:user.id})
        })
        const res=await response.json()
        console.log(res);
    }
  return (
    <div>
      <div className='contain'>
        <img src={user.image} className='user-image'></img>
        <span className='user'>{user.username}</span>
        <button className='sendreq' onClick={handleonclick}>Accept</button>
        <button className='sendreq' onClick={handleonreject}>Reject</button>
      </div>
    </div>
  )
}

export default ConnectionFile
