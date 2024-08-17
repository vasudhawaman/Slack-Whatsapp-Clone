import React,{useEffect,useContext} from "react";
import VideoCallIcon from '@mui/icons-material/VideoCall';
import "./Profile.css";
import {SocketContext} from "./context/SocketContext"
export default function Profile({user,room}){
            
            
             const {socket} =useContext(SocketContext);
   useEffect(()=>{
        socket.on("recieve_call",(data)=>{
          console.log(data);
                 const popup= document.getElementById("callRecieve");
                 popup.showModal();
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
              {user}
            </div>
            <VideoCallIcon onClick={videoCall}/>
           
         </div>
        
        </>
         
       );
}