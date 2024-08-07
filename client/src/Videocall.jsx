
import React,{useState,useContext, useRef} from "react";
import { SocketContext } from "./context/SocketContext";
import Calling from "./Calling";
export default function Videocall(){
 const [user,setUser] =useState("");
 const [room,setRoom]=useState("");
 const [join,setJoin] =useState(false);
 const [audio,setAudio] =useState(true);
 const [video,setVideo] =useState(true);
 const videoRef =useRef();
  const {socket} =useContext(SocketContext)
  // this is okay
 function handleSubmit(e){
     e.preventDefault();
    socket.emit("join_call",{room:room,user:user});
    socket.emit("start_call",{room:room,user:user});
    setJoin(true)
    
     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(
       (stream) => {
       
         const myVideo = document.createElement('video');
         const myDiv = document.createElement('div');
           myVideo.muted = true;
           const videoGrid = document.getElementById('video-grid');
           myVideo.srcObject = stream
           myVideo.addEventListener('loadedmetadata', () => {
             myVideo.play()
           })
           videoGrid.append(myVideo)
          
       });
}



    return(
      <div className="container">
      <div className="leftSide">
        
         <form onSubmit={handleSubmit}>
         <input type="text" value={room} onChange={(e)=>{
             setRoom(e.target.value);
         }}/>
         <input type="text" value={user} onChange={(e)=>{
             setUser(e.target.value);
         }}/>
         <button>Submit</button>
         </form>
         
         
       </div>
       <div className="rightSide">
      { join ?<Calling user={user}  /> : null}
     </div>
      
      </div>
       
    )
}