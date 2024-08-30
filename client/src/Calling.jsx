import React,{useState,useEffect,useContext,useRef} from "react";
import { SocketContext } from "./context/SocketContext";
import {useNavigate} from "react-router-dom";
import {Peer} from "peerjs";
export default function Calling({user,stream}){
     const peerRef = useRef(null);
     const Navigate = useNavigate();
     function addVideoStream(video, stream) {
      const videoGrid = document.getElementById('video-grid');
      video.srcObject = stream;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
      videoGrid.append(video);
    }

  useEffect(() => {
    peerRef.current = new Peer(user, {
      host: "/",
      port: "3001",
    });

    const peer = peerRef.current;

    
    peer.on("call", (call) => {
      call.answer(stream);
      const video = document.createElement('video');
      call.on("stream", (remoteStream) => {
        addVideoStream(video, remoteStream);
      });
      call.on("close", () => {
        video.remove();
      });
    });

    // return () => {
    //   peer.disconnect();
    //   peer.destroy();
    // };
  }, [user, stream]);
    
    const {socket} =useContext(SocketContext);
    
    useEffect(()=>{
  
        socket.on("on-call",(data)=>{
                  console.log("on-call",data);
                 
                  const call = peerRef.current.call(data.user, stream);
                  
                  const video = document.createElement('video')
                  call.on("stream", (remoteStream) => {
                    addVideoStream(video, remoteStream)
                    console.log("called others")
                  });
            
         })
         socket.on("call-end",()=>{
            Navigate("/");
         })
       
 },[socket]);
        return(
          <div className="call">
          </div>
           
        )
}