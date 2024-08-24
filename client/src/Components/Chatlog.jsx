import React, { useState, useEffect } from 'react';
import './Chatlog.css';
import useWindowDimensions from './Dimensions';
export default function Chatlog(data) {
    console.log(data.data);
    const  dimension = useWindowDimensions();
    return (
          <>
        { dimension.width < 600 ?  <div className="chatlog" onClick={()=>{
            console.log("clicked this div");
           const element= document.querySelector(".chat-rooms");
           element.style.display = "none";
           const chat = document.querySelector(".chat");
           const input = document.querySelector("#input");
           const form = document.querySelector(".chat-input-form");
          
           console.log(chat);
           chat.style.width ="100%";
           input.style.width ="100%";
        }}>
            <div className='imgProfile'>
                <img src={data.data.image} height="50px" width="50px" style={{borderRadius:"100%"}}/>
            </div>
            <div className='information'>
                <h1>{data.data.username}</h1>
                <p>last message</p>
            </div>
            <div className='unread'>
            <h1></h1>
             <p>1</p>
            </div>
        </div> :  <div className="chatlog" >
            <div className='imgProfile'>
                <img src="./vasudha.jpg" height="50px" width="50px" style={{borderRadius:"100%"}}/>
            </div>
            <div className='information'>
                <h1>{data.data.username}</h1>
                <p>last message</p>
            </div>
            <div className='unread'>
            <h1></h1>
             <p>1</p>
            </div>
        </div> }
        </>
    )
}
