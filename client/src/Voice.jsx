import React from "react";
export default function Voice(){
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const playButton = document.getElementById('play');
    let output = document.getElementById('output');
    let audioRecorder;
    let audioChunks = [];
    navigator.mediaDevices.getUserMedia({ audio: true })
       .then(stream => {
        audioRecorder = new MediaRecorder(stream);
        startButton.addEventListener("click",()=>{
            audioRecorder.start();
        })
       
        audioRecorder.stop();
        const blobObj = new Blob(audioChunks, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(blobObj);
        const audio = new Audio(audioUrl);
        audio.play();
       })
      
}