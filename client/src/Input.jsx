import React,{useState,useEffect, useContext} from "react";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Video from "./Video";
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import StickyNote2TwoToneIcon from '@mui/icons-material/StickyNote2TwoTone';
import "./Input.css";
import Emoji from "./Emoji";
import Voice from "./Voice";
import File from "./File";
import { SocketContext } from "./context/SocketContext";
import Sticker from "./Sticker";
import SpeechToText from "./Components/SpeechToText";
import StickerFile from "./StickerFile";

export default function Input({setMessage,room,user}){
     const [text,setText] = useState("");
     const [file,setFile] =useState("");
     const [sticker,setSticker] =useState("");
     const {socket} = useContext(SocketContext);
     let min =new Date().getMinutes();
     let hr = new Date().getHours();
     
    if( min <10){
         min = "0" + min;
    }
     function sendMessage(){
          setMessage((prev)=>{
               return [...prev ,{
                     text:text,
                    type :"sent",
                     time: hr +":"+min
               }]}) 
        
          socket.emit("send_message",{ 
               text:text,
               user: user,
               room:room
          });
          
     }
     function handleChange(e){
           setText(e.target.value);
           socket.emit("typing",{
               room:room,
               user:user
           });
     }
     function addEmoji(e){
          setText((prev)=> {return prev + e.target.value});
          e.preventDefault();
     }
      function handleForm(e){
           e.preventDefault();
           let min =new Date().getMinutes();
           let hr = new Date().getHours();
           sendMessage();
           console.log(user)
           setText("");
      }
      
      
     return(
          <>
    <div id="input">
        <form className="chat-input-form" onSubmit={handleForm}>
           <AttachFileIcon onClick={()=>{
               document.getElementById("file").style.display ="block";
           }}/>
           <textarea id="chat-input" type="text" placeholder="Write your Message here.." value={text} onChange={handleChange} name="text"/>
           <EmojiEmotionsIcon value={0}onClick={()=>{
               
               document.getElementById("emoji").style.display ="block"
           }}/>
          <Emoji addEmoji={addEmoji}  />
          <Voice setMessage={setMessage} room={room} user={user}/>
          <Video setMessage={setMessage} room={room} user={user}/>
            <button id="messagebtn"><SendIcon style={{ color : "whitesmoke " , padding: "2px"}}/></button>

       </form>
       <StickyNote2TwoToneIcon onClick={()=>{
            document.getElementById("sticker").style.display ="block";
       }}/>
        <SpeechToText text={text} setText={setText} setMessage={setMessage} room={room} user={user}/>
    </div>
     <File setMessage={setMessage} room={room} user={user} file={file} setFile={setFile}/>
    <StickerFile setMessage={setMessage} room={room} user={user}/>
     </>
     )
}