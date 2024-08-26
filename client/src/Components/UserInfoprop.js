import React from 'react'
import { Link } from 'react-router-dom'

const UserInfoprop = ({info,image1}) => {
  return (
    <div>
      <div className='cont'>
                <h1 className='user-profile'>User Profile</h1>
                {info ? (
                    <>
                       { image1? <img src={image1} className='userImage' alt='User' />:null}
                        <h2 className='username'>{info.username}</h2>
                        <div className='user-info'>Email-Id: {info.email}</div>
                        <div className='status'>{info.status}</div>
                        <Link to='/editprofile'>Edit profile</Link>
                    </>
                ) : (
                    <p>Loading...</p> 
                )}
            </div>
    </div>
  )
}

export default UserInfoprop
