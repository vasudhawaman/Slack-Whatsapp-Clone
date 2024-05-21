import React,{useState,useEffect} from "react";
import "./Chat.css"
import Message from "./Message";
import Input from "./Input";
import Profile from "./Profile";

import io from "socket.io-client";
const socket = io.connect("http://localhost:8000");
export default function Chat(){
     const [message,setMessage] =useState([{ text: "You only live once", type:"sent", time:"7:58"},{ text: "You only live once", type:"recieve", time:"7:58"}]);
    
     let min =new Date().getMinutes();
           let hr = new Date().getHours();
           
          if( min <10){
               min = "0" + min;
          }
     useEffect(()=>{
      socket.on("recieve_message",(data)=>{
                setMessage((prev)=>{
                   return [...prev ,{
                         text:data,
                         type:"recieve",
                         time: hr +":"+min
                   }];
                })
      })
     },[socket]);
     
    return(
        <div id="chat">
        <Profile user="Krish" link="pfp.png" />

         <div id="all"> 
         <Message type="sent" text ="hello how are you doing would you liek tog udnc" time="8:59" />
         <Message type="recieve" text ="welcome" time="8:59" />
         <Message type="recieve" text ="welcome" time="8:59" grp="true" user="vasudha"/>
         <Message type="sent" text ="welcome" time="8:59" grp="true" user="vasudha"/>
         {message.map((m)=>{
            return <Message type={m.type} text={m.text} time={m.time} file={m.file} source={m.source}/>;
         }) }
         
         </div>
        
         <Input setMessage={setMessage} />
        </div>
    );
}

