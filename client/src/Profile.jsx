import React,{useEffect, useState} from "react";
import VideoCallIcon from '@mui/icons-material/VideoCall';
import io from "socket.io-client";
import "./Profile.css";
const socket = io.connect("http://localhost:8000");
export default function Profile(props){
//             const [sendCall,setSendcall] =useState(false);
//             const [recieve_call,setRecievecall] =useState(false);
//   useEffect(()=>{
//        socket.on("recieve_call",(data)=>{
//                   setSendcall(true);
//               });
//             },[socket]);
// function videoCall(){
//               socket.emit("video_call",{ 
//                 text:text,
//                 type:"sent"
            
//             });
//              } 
  
       return(
         <div id="profile">
            <div id="pic">
                <img src={props.link} />
            </div>
            <div id="username" >
                {props.user}
            </div>
            <VideoCallIcon />
         </div>
       );
}