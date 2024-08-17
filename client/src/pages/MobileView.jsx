import React from "react";
import './NewHome.css';
import Chatlog from "../Components/Chatlog";
export default function MobileView({message,setMessage,room,user}){
    return(
        <main className="chat" id="mobile">

        <Chat message={message} setMessage={setMessage} user={user} room={room} />
  </main>
    )
}