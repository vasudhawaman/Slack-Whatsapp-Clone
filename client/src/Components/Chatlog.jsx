import React from 'react';
import './Chatlog.css';

export default function Chatlog() {
   
    return (

        <div className="chatlog">
            <div className='imgProfile'>
                <img src="./vasudha.jpg" height="50px" width="50px" style={{borderRadius:"100%"}}/>
            </div>
            <div className='information'>
                <h1>Name of user</h1>
                <p>last message</p>
            </div>
            <div className='unread'>
            <h1></h1>
             <p>1</p>
            </div>
        </div>
          
    )
}
