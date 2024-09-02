import React, { useEffect, useContext, useState } from "react";
import VideoCallIcon from '@mui/icons-material/VideoCall';
import "./Profile.css";
import useWindowDimensions from './Components/Dimensions'
import {SocketContext} from "./context/SocketContext"
import {UserContext} from "./context/UserContext";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';

export default function Profile({user,room}){
  const [userdata,setData] =useState({room:room,user:user});
            const  dimension = useWindowDimensions();
            const  {current} = useContext(UserContext);
            const Navigate = useNavigate();
            const [typing,setTyping] = useState(false)
             const {socket} =useContext(SocketContext);
             const AcceptCallButton =({closeToast}) =>{
                 return <span onClick={()=>{
                  socket.emit("start_call",{room:room,user:current.username});
                       Navigate(`/call?user=${current.username}&room=${room}`);
                      closeToast()
                  }}>📞</span>;
             }
   useEffect(()=>{
                
             socket.on("recieve_call",(data)=>{
              console.log("this  on-call",data);
                    toast(`Receive call from ${data.user}!`);
               });
                    socket.on("userIsTyping",(data)=>{
                           setTyping(true);
                     });
                    //  socket.on("on-call",(data)=>{
                      
                    //  })
                     
         
             },[socket]);
     function videoCall(){
                 socket.emit("join_call",{room:room,user:current.username});
                 socket.emit("start_call",{room:room,user:current.username});
                 Navigate(`/call?user=${current.username}&room=${room}`);
              } 
      
       return(
        <>
        <div id="profile">
        {dimension.width<600 ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16" onClick={()=>{
                const element = document.querySelector(".chat-rooms");
                element.style.display = "block";
                const chat = document.querySelector(".chat");
                const input = document.querySelector("#input");
                const voice = document.querySelector("#startVoice");
                const video = document.querySelector("#startVideo");
                const attach = document.querySelector("#attach-icon");
                const sticker = document.querySelector("#sticker-icon");
                const speech = document.querySelector("#speech-icon");
                const emoji = document.querySelector("#emoji-icon");
                const sendMessage = document.querySelector("#messagebtn");
                const form = document.querySelector(".chat-input-form");
                const profile = document.querySelector("#profile");

                chat.style.width = "0%";
                input.style.width = "0%";
                profile.style.display = "none";
                voice.style.display = "none";
                video.style.display = "none";
                attach.style.display = "none";
                sendMessage.style.display ="none";
                speech.style.display ="none";
                sticker.style.display ="none";
                emoji.style.display ="none";
           }}>
  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
</svg> : null}
            <div id="pic">
            <img src="./vasudha.jpg" height="30px" width="30px" style={{borderRadius:"100%"}}/>
            </div>
            <div id="username" >
              <h1>{user}</h1>
              <p>{typing ? "Typing...." : null}</p>
            </div>
            <div style={{color:"whitesmoke",marginLeft:"5px"}} onClick={videoCall}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-camera-video" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z"/>
</svg>
            </div>
            
           
         </div>
      <ToastContainer closeButton={AcceptCallButton}/>  
        </>
         
       );
}