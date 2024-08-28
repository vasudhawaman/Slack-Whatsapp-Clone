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
import { UserContext } from "./context/UserContext";
export default function Input({setMessage,room,user}){
     const [text,setText] = useState("");
     const [file,setFile] =useState("");
     const [sticker,setSticker] =useState("");
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
     function sendMessage(){
         
          socket.emit("send_message",{ 
               text:text,
               user:current.username,
               room:room,
               time: hr +":"+min,
               date:dateObj
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
           }} id="icon"/>
           <textarea id="chat-input" type="text" placeholder="Write your Message here.." value={text} onChange={handleChange} name="text"/>
           <EmojiEmotionsIcon value={0}onClick={()=>{
               
               document.getElementById("emoji").style.display ="block"
           }}/>
          <Emoji addEmoji={addEmoji}  id="icon"/>
          <Voice setMessage={setMessage} room={room} user={user} id="icon"/>
          <Video setMessage={setMessage} room={room} user={user} id="icon"/>
            <button id="messagebtn"><SendIcon style={{ color : "whitesmoke " , padding: "2px"}}/></button>

       </form>
       <StickyNote2TwoToneIcon onClick={()=>{
            document.getElementById("sticker").style.display ="block";
       }}/>
        <SpeechToText text={text} setText={setText} setMessage={setMessage} room={room} user={user} id="icon"/>
    </div>
     <File setMessage={setMessage} room={room} user={user} file={file} setFile={setFile} id="icon"/>
    <StickerFile setMessage={setMessage} room={room} user={user} id="icon"/>
     </>
     )
}