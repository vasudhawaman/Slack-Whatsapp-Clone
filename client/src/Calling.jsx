import React,{useState,useEffect,useContext} from "react";
import { SocketContext } from "./context/SocketContext";
import {useNavigate} from "react-router-dom";
import {Peer} from "peerjs";
import Control from "./Components/Control";

export default function Calling({current,stream}){
     const [peer,setPeer] = useState(new Peer(current,{
      host:"/",
      port:"3001"
    }))

      const Navigate = useNavigate();
      function addVideoStream(video, stream) {
        const videoGrid = document.getElementById('video-grid');
        video.srcObject = stream
        video.addEventListener('loadedmetadata', () => {
          video.play()
        })
        videoGrid.append(video)
      }
    
      peer.on("call", (call) => {
            console.log(stream);
            call.answer(stream);
            console.log("called call")
            const video = document.createElement('video') // Answer the call with an A/V stream.
            call.on("stream", (remoteStream) => {
             
              addVideoStream(video, remoteStream)
            });
            call.on('close', () => {
                video.remove()
                
            })  
      });
   
    
    const {socket} =useContext(SocketContext);
    
    useEffect(()=>{
  
        socket.on("on-call",(data)=>{
                  console.log("on-call",data);
                  console.log(peer);
                  const call = peer.call(data.user, stream);
                  
                  const video = document.createElement('video')
                  call.on("stream", (remoteStream) => {
                    addVideoStream(video, remoteStream)
                    console.log("called others")
                  });
            
         })
         socket.on("call-end",(data)=>{
          Navigate("/");
      }) 
 
       
           
        },[socket]);
        return(
          <div className="call">
          </div>
           
        )
}