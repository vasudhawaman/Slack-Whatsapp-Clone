import React,{useEffect, useState,useContext} from "react";
import VideoCallIcon from '@mui/icons-material/VideoCall';
import "./Profile.css";
import {SocketContext} from "./context/SocketContext"
export default function Profile({user}){
             const [sendCall,setSendcall] =useState(false);
             const [recieve_call,setRecievecall] =useState(false);
             if(recieve_call){
                 document.getElementById("videocall").style.display ="block";
             }
             const {socket} =useContext(SocketContext);
   useEffect(()=>{
        socket.on("recieve_call",(data)=>{
                   setSendcall(true);
               });
              
             },[socket]);
     function videoCall(){
                socket.emit("join_call",{
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