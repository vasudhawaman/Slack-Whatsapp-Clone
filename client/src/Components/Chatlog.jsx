import React, { useState, useEffect } from 'react';
import './Chatlog.css';

export default function Chatlog(data) {
    console.log(data.data);
    return (

        <div className="chatlog">

            <div className='imgProfile'>
                <img src={data.data.image} height="50px" width="50px" style={{ borderRadius: "100%" }} />
            </div>
            <div className='information'>
                <h1>{data.data.username}</h1>
                <p>last message</p>
            </div>
            <div className='unread'>
                <h1></h1>
                <p>1</p>
            </div>
        </div>

    )
}
