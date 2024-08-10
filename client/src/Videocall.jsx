
import React,{useState,useContext,useEffect} from "react";
import { SocketContext } from "./context/SocketContext";
import Calling from "./Calling";
import './Videocall.css';
export default function Videocall(){
 const [user,setUser] =useState("");
 const [room,setRoom]=useState("");
 const [join,setJoin] =useState(false);
 const [stream,setStream] =useState(null);

  const {socket} =useContext(SocketContext);
  useEffect(()=>{
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(
      (stream) => {
        setStream(stream); // gets stream of user
      });

  },[])
  // this is okay
 function handleSubmit(e){
     e.preventDefault();
    socket.emit("join_call",{room:room,user:user});
    socket.emit("start_call",{room:room,user:user});
          setJoin(true)
          console.log(stream,"myside")
          const myVideo = document.createElement('video');
          const myDiv = document.createElement('div');
          const button1 = document.createElement('button');
            myVideo.muted = true;
            const videoGrid = document.getElementById('video-grid');
            myVideo.srcObject = stream;
            myVideo.addEventListener('loadedmetadata', () => {
              myVideo.play();
            })
        //    videoGrid.append(myVideo)
        button1.innerHTML ="Show cam";
 button1.addEventListener('click',()=>{
                  const videoTrack = stream.getTracks().find(track => track.kind === 'video');
                  if(videoTrack.enabled){
                      videoTrack.enabled = false;
                      button1.innerHTML ="TURN CAM ON";
                  }else{
                    videoTrack.enabled = true;
                    button1.innerHTML ="TURN CAM OFF";
                  }
           })
           myDiv.append(myVideo);
           myDiv.append(button1);
           videoGrid.append(myDiv);
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
      { join ?<Calling user={user}  stream={stream}/> : null}
     </div>
     <div id="video-grid">
     </div>
      </div>
       
    )
}