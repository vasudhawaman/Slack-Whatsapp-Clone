import React from 'react'
import './User.css'
const User = () => {
    return (
        <div>
            <div className='cont'>
                <h1 className='user-profile'>User Profile</h1>
                <img src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg" className='userImage'></img>
                <input type='file' id='userimage' style={{display:'none'}}></input>
                <label for='userimage'><div className='edit'>Edit profile</div></label>
                <h2 className='username'>Krish Pathak</h2>
                <div className='user-info'>Email-Id :krishpathak20@gmail.com</div>
                <div className='status'>Hey There! I am Krish pathak And i am using Talkpal</div>
            </div>
        </div>
    )
}

export default User
