import React,{useState,useEffect, useContext} from "react";
import "./Chat.css"
import Message from "./Message";
import Input from "./Input";
import Profile from "./Profile";
import { SocketContext } from "./context/SocketContext";

export default function Chat({message,setMessage,user,room}){
    
      const {socket} = useContext(SocketContext);
      let min =new Date().getMinutes();
           let hr = new Date().getHours();
           
          if( min <10){
               min = "0" + min;
          }
     
      useEffect(()=>{
     
            socket.on("recieve_message",(data)=>{
                        setMessage((prev)=>{
                              return [...prev ,{
                                    text:data.text,
                                   type :"recieve",
                                    time: hr +":"+min }]}) 
                  }) 
                  
         console.log(message)
           },[socket]);
           
    return(
        <div id="chat">
        <Profile  link="pfp.png" user={user}/>

         <div id="all"> 
         <Message type="sent" text ="hello how are you doing would you liek tog udnc" time="8:59" />
         <Message type="recieve" text ="welcome" time="8:59" />
         <Message type="recieve" text ="welcome" time="8:59" grp="true" user="vasudha"/>
         <Message type="sent" text ="welcome" time="8:59" grp="true" user="vasudha"/>
         {message.map((m,i)=>{
            return <Message type={m.type} text={m.text} time={m.time} file={m.file} source={m.source} cloudinary={m.cloudinary} key={i} />;
         }) }
         
         </div>
        
         <Input setMessage={setMessage} room={room} user={user}/>
        </div>
    );
}

