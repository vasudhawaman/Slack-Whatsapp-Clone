
import React,{useState,useContext,useEffect} from "react";
import { SocketContext } from "./context/SocketContext";
import Calling from "./Calling";
import './Videocall.css';
export default function Videocall(){
 const [user,setUser] =useState("");
 const [room,setRoom]=useState("");
 const [join,setJoin] =useState(false);
 const [stream,setStream] =useState(null);
 const [screen,setScreen] =useState(false)
  const {socket} =useContext(SocketContext);
  useEffect(()=>{
    console.log("use effect ran ");
   if(!stream) navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(
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
          const myDiv =  document.getElementById('controls');
          const button1 = document.createElement('button');
          const button2 = document.createElement('button');
          const shareScreen = document.createElement('button');
          const endCall = document.createElement('button');
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
           button2.innerHTML ="Audio ON";
           button2.addEventListener('click',()=>{
                            const audioTrack = stream.getTracks().find(track => track.kind === 'audio');
                            if(audioTrack.enabled){
                                audioTrack.enabled = false;
                                button2.innerHTML ="TURN Audio ON";
                            }else{
                              audioTrack.enabled = true;
                              button2.innerHTML ="TURN Audio OFF";
                            }
                     })
             shareScreen.innerHTML ="Share screen";
            shareScreen.addEventListener('click',()=>{
                      setScreen(true)
                      const displayMediaOptions = {
                        video: {
                          displaySurface: "browser",
                        },
                        audio: {
                          suppressLocalAudioPlayback: false,
                        },
                        preferCurrentTab: false,
                        selfBrowserSurface: "exclude",
                        systemAudio: "include",
                        surfaceSwitching: "include",
                        monitorTypeSurfaces: "include",
                      };
                      navigator.mediaDevices.getDisplayMedia(displayMediaOptions).then((display)=>{
                        
                        myVideo.srcObject = display;
                      });
                      
               })
          endCall.innerHTML ="Leave Call";
         endCall.addEventListener('click',()=>{
               socket.emit("end-call",{
                  room:room,
                  user:user
               });

              
         })
           myDiv.append(button1);
           myDiv.append(button2);
           myDiv.append(shareScreen);
           myDiv.append(endCall);
           videoGrid.append(myVideo);
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
       <div>
      { join ?<Calling user={user}  stream={stream}/> : null}
     </div>
       <div id="video-grid">
       </div>
       <div id="controls">

       </div>
      </div>
       
    )
}