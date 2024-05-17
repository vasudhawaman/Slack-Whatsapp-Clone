import React,{useState,useEffect} from "react";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import "./Input.css";
import Emoji from "./Emoji";
import io from "socket.io-client";
const socket = io.connect("http://localhost:8000");
export default function Input({setMessage}){
     const [text,setText] = useState("");
     
     function sendMessage(){
          socket.emit("send_message",text);
     }
     function handleChange(e){
           setText(e.target.value);
           e.preventDefault();
     }
     function addEmoji(e){
          setText((prev)=> {return prev + e.target.value});
          e.preventDefault();
     }
      function handleForm(e){
           e.preventDefault();
           let min =new Date().getMinutes();
           let hr = new Date().getHours();
           const height =  document.getElementById("message").offsetHeight;
          
           window.scrollTo(window.innerWidth,window.innerHeight + height);
          if( min <10){
               min = "0" + min;
          }
           setMessage((prev)=>{ return [...prev ,{
                text:text,
                type:"sent",
                time:hr+":"+min
           }]});
           sendMessage();
           setText("");
      }
     return(
    <div id="input">
        <form className="chat-input-form" onSubmit={handleForm}>
           <AttachFileIcon />
           <textarea id="chat-input" type="text" placeholder="Write your Message here.." value={text} onChange={handleChange} name="text"/>
           <EmojiEmotionsIcon value={0}onClick={()=>{
               
               document.getElementById("emoji").style.display ="block"
           }}/>
          <Emoji addEmoji={addEmoji}  />
           <KeyboardVoiceIcon style={{ color : "whitesmoke"}} />
           <button><SendIcon style={{ color : "whitesmoke " , padding: "2px"}}/></button>
       </form>
        
    </div>
     )
}