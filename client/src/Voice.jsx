import React, { useState,useRef } from "react";
import './Voice.css';
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import StopIcon from '@mui/icons-material/Stop';
import axios from 'axios';
export default function Voice({setMessage}){
     const [audioBlobs,setAudioblobs] = useState([]);
    const recorder= useRef(null);
     const [stream,setStream] = useState(null);
    navigator.mediaDevices.getUserMedia({audio:true}).then((stream)=>{
        setStream(stream);
      
})
   async function sendTocloud(){
    let date = Date.now();
    let time = Math.floor(Math.random()*1000);
    let formData = new FormData();
    let audioData = new Blob(audioBlobs, 
        { 'type': 'audio/mp4;' });
        audioData.lastModifiedDate = new Date();
        audioData.name = 'new.mp4';
    formData.append("file",audioData);
    formData.append("upload_preset", 'vasudha');
     let fileName = date +'_'+time;
    formData.append("public_id", fileName);
    try{
      const response =  await axios.post("https://api.cloudinary.com/v1_1/dptvzw1kc/video/upload",formData);
      if(response){
        console.log(response.data);
        const {secure_url} = response.data; // wrokeddd yay
      return secure_url;
     
    }else{
        throw "e";
    }
      
    }catch(error){
       return null;
    }
   }
    function startRecording(){
        console.log("start");
        document.getElementById("startVoice").style.display ="none";
        document.getElementById("stopVoice").style.display ="block";
        const media = new MediaRecorder(stream, { type:'audio/mp4' });
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
        setAudioblobs(localAudioChunks);
    }
     function stopRecording(){
        document.getElementById("startVoice").style.display ="block";
        document.getElementById("stopVoice").style.display ="none";
        recorder.current.stop();
        let min =new Date().getMinutes();
           let hr = new Date().getHours();
           const height =  document.getElementById("message").offsetHeight;
          
           window.scrollTo(window.innerWidth,window.innerHeight + height);
          if( min <10){
               min = "0" + min;
          }
        recorder.current.onstop = async (e)=>{
               const url = await sendTocloud();
               console.log(url);
            let audioData = new Blob(audioBlobs, 
                { 'type': 'audio/mp4;' });
                audioData.lastModifiedDate = new Date();
                audioData.name = 'new.mp4';
                var fr = new FileReader();
                fr.onload = function () {
                    //  setSrc(fr.result);
                   setMessage((prev)=>{
                     return [...prev,{
                         type:'sent',
                         source:fr.result,
                         file:'audio',
                         time:hr+':'+min,
                         cloudinary: url

                     }];
                   });
                   
       
             }
                fr.readAsDataURL(audioData);
        }
        
     }   
   
     return(

        
        <div id="record" >
            <button onClick={startRecording} type="button"id="startVoice"><KeyboardVoiceIcon style={{ color : "whitesmoke"}} /></button>
            <button onClick={stopRecording} type="button" id="stopVoice" ><StopIcon /></button>
        </div>
     )
}