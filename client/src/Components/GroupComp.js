import React from 'react'
import { useNavigate } from 'react-router-dom'

const GroupComp = (group) => {
    const navigate=useNavigate()
    const handleonclick=()=>{
        navigate(`/adduser/${group.group.groupid}`);
    }
    const seeMember=()=>{
        navigate(`/groupmembers/${group.group.groupid}`);
    }
  return (
    <div>
      <div className='contain'>
        <img src='' className='user-image'></img>
        <span className='user'>{group.username}</span>
        <button className='sendreq' onClick={seeMember}>Member</button>
        <button className='sendreq' onClick={handleonclick}>Add Users</button>
      </div>
    </div>
  )
}

export default GroupComp
