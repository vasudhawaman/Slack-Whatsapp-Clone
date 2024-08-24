import React from "react";
import './NewHome.css';
import Chatlog from "../Components/Chatlog";
export default function MobileView({message,setMessage,room,user}){
    const  dimension = useWindowDimensions();
    return(
        <main className="chat" id="mobile">

        <Chat message={message} setMessage={setMessage} user={user} room={room} />
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
        </div> :  <div className="chatlog" >
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
        </div> }
  </main>
    )
}