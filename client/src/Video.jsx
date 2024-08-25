import React, { useState,useRef, useContext } from "react";
import './Voice.css';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import StopIcon from '@mui/icons-material/Stop';
import { SocketContext } from "./context/SocketContext";
export default function Video({setMessage,room,user}){
     const [videoBlobs,setVideoblobs] = useState([]);
    const recorder= useRef(null);
     const [stream,setStream] = useState(null);
    navigator.mediaDevices.getUserMedia({audio:true,video:true}).then((stream)=>{setStream(stream);})
   const {socket} =useContext(SocketContext)
    function startRecording(){
        console.log("start");
        document.getElementById("startVideo").style.display ="none";
        document.getElementById("stopVideo").style.display ="block";
        const media = new MediaRecorder(stream, { type:'video/mp4' });
        //set the MediaRecorder instance to the mediaRecorder ref
        recorder.current = media;
        //invokes the start method to start the recording process
        recorder.current.start();
        let localAudioChunks = [];
        recorder.current.ondataavailable = (event) => {
           if (typeof event.data === "undefined") return;
           if (event.data.size === 0) return;
           localAudioChunks.push(event.data);
        };
        setVideoblobs(localAudioChunks);
    }
     function stopRecording(){
        document.getElementById("startVideo").style.display ="block";
        document.getElementById("stopVideo").style.display ="none";
        recorder.current.stop();
        let min =new Date().getMinutes();
           let hr = new Date().getHours();
           let date = new Date().getDate();
     let month = new Date().getMonth() +1;
     let year = new Date().getFullYear();
     let dateObj = `${date}/${month}/${year}`;
           const height =  document.getElementById("message").offsetHeight;
          
           window.scrollTo(window.innerWidth,window.innerHeight + height);
          if( min <10){
               min = "0" + min;
          }
        recorder.current.onstop =(e)=>{
            let videoData = new Blob(videoBlobs, 
                { 'type': 'video/mp4;' });
                videoData.lastModifiedDate = new Date();
                videoData.name = 'new.mp4';
                var fr = new FileReader();
                fr.onload = function () {
                    //  setSrc(fr.result);
                   setMessage((prev)=>{
                     return [...prev,{
                         type:'sent',
                         source:fr.result,
                         file:'video',
                         time:hr+':'+min,
                         date:dateObj
                     }];                  
                    
                    });
                    
                   
       
             } 
             fr.readAsDataURL(videoData);
                socket.emit("send_message",{ 
                    source:videoData, // sent as buffer
                    file:'video',
                    user: user,
                    room:room,
                    time:hr+":"+min,
                    mimetype:'video/mp4',
                    date:dateObj
               });
        }
        
     }   
   
     return(

        
        <div id="record" >
            <button onClick={startRecording} type="button"id="startVideo"><CameraAltIcon style={{ color : "whitesmoke"}} /></button>
            <button onClick={stopRecording} type="button" id="stopVideo" ><StopIcon /></button>
        </div>
     )
}