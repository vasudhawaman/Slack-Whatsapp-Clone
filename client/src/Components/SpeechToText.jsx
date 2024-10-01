import React,{useContext} from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import VoiceChatIcon from '@mui/icons-material/VoiceChat';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import './SpeechToText.css';
import {SocketContext} from "../context/SocketContext";
import {UserContext} from "../context/UserContext";
export default function SpeechToText({text,setText,setMessage,room,user}){
  const {socket} = useContext(SocketContext);
  const {current} = useContext(UserContext);
  let min =new Date().getMinutes();
  let hr = new Date().getHours();
  let date = new Date().getDate();
  let month = new Date().getMonth() +1;
  let year = new Date().getFullYear();
  let dateObj = `${date}/${month}/${year}`;
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
            
        }}><VoiceChatIcon id="speech-icon"/></button> :
        <button className="speech" onClick={()=>{
             setText(transcript);
            SpeechRecognition.stopListening() 
            
        }}><GraphicEqIcon /></button> }
         </>
        
    )
}