import React,{useEffect, useState} from "react";
import VideoCallIcon from '@mui/icons-material/VideoCall';
import io from "socket.io-client";
import "./Profile.css";
const socket = io.connect("http://localhost:8000");
export default function Profile({user}){
             const [sendCall,setSendcall] =useState(false);
             const [recieve_call,setRecievecall] =useState(false);
             if(recieve_call){
                 document.getElementById("videocall").style.display ="block";
             }
   useEffect(()=>{
        socket.on("recieve_call",(data)=>{
                  if(data.user !== user) setSendcall(true);
               });
              
             },[socket]);
     function videoCall(){
                socket.emit("join_call",{
                  user:user
                });
               socket.emit("video_call",{ 
                 user:user
            
             });
              } 
      function joinCall(){
               setRecievecall(true);
                socket.emit("join_call",{ 
                  user:user
             
              });
               } 
       return(
         <div id="profile">
            <div id="pic">
               <img src="" />
            </div>
            <div id="username" >
              {user}
            </div>
            <VideoCallIcon onClick={videoCall}/>
            { sendCall ? <button id="recieve" type="button" onClick={joinCall}>Recieve call</button> : null}
         </div>
       );
}