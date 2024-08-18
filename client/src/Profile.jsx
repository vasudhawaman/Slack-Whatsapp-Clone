import React,{useEffect,useContext, useState} from "react";
import VideoCallIcon from '@mui/icons-material/VideoCall';
import "./Profile.css";
import {SocketContext} from "./context/SocketContext"
export default function Profile({user,room}){
            
            const [typing,setTyping] = useState(false)
             const {socket} =useContext(SocketContext);
   useEffect(()=>{
        socket.on("recieve_call",(data)=>{
          console.log(data);
                 const popup= document.getElementById("callRecieve");
                 popup.showModal();
               });
               socket.on("userIsTyping",(data)=>{
                           setTyping(true);
                     });
              
             },[socket]);
     function videoCall(){
                socket.emit("join_call",{
                  user:user,
                  room:room
                });
              
              } 
      
       return(
        <>
        <div id="profile">
            <div id="pic">
               <img src="" />
            </div>
            <div id="username" >
              <h1>{user}</h1>
              <p>{typing ? "Typing...." : null}</p>
            </div>
            <VideoCallIcon onClick={videoCall}/>
           
         </div>
        
        </>
         
       );
}