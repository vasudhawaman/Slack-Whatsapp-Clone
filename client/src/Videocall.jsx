
import React,{useEffect} from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:8000");
export default function Videocall(){
    useEffect(()=>{
          socket.on('on-call',(data)=>{

          })
    },[socket]);
    // const myPeer = new Peer(undefined, {
    //     host: '/',
    //     port: '3001'
    //   })
      const myVideo = document.createElement('video')
      myVideo.muted = true
      const peers = {}
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      }).then(stream => {
        addVideoStream(myVideo, stream)
      
        // myPeer.on('call', call => {
        //   call.answer(stream)
        //   const video = document.createElement('video')
        //   call.on('stream', userVideoStream => {
        //     addVideoStream(video, userVideoStream)
        //   })
        // }) 
    })
      
    function connectToNewUser(userId, stream) {
        // const call = myPeer.call(userId, stream)
        // const video = document.createElement('video')
        // call.on('stream', userVideoStream => {
        //   addVideoStream(video, userVideoStream)
        // })
        // call.on('close', () => {
        //   video.remove()
        // })
      
        // peers[userId] = call
      }
      function addVideoStream(video, stream) {
        video.srcObject = stream
        video.addEventListener('loadedmetadata', () => {
          video.play()
        })
        // videoGrid.append(video)
      }
    return(
        <div id="videocall">
             
        </div>
    )
}