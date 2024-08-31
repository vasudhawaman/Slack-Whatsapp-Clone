import React,{useContext} from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import VoiceChatIcon from '@mui/icons-material/VoiceChat';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import './SpeechToText.css';
import {SocketContext} from "../context/SocketContext";
export default function SpeechToText({text,setText,setMessage,room,user}){
  const {socket} = useContext(SocketContext);
  let min =new Date().getMinutes();
     let hr = new Date().getHours();
     
    if( min <10){
         min = "0" + min;
    }
    
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();

      
       
      if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
      }
    return(
         <>
        { !listening ? <button className="speech" onClick={()=>{
            SpeechRecognition.startListening() 
            
        }}><VoiceChatIcon id="icon"/></button> :
        <button className="speech" onClick={()=>{
            SpeechRecognition.stopListening() 
            setText(transcript);
        }}><GraphicEqIcon onClick={()=>{
        
       socket.emit("send_message",{ 
            text:text,
            user: user,
            room:room
       });
        }}/></button> }
         </>
        
    )
}