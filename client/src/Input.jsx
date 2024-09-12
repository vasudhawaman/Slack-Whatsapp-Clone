import React, { useState, useEffect, useContext } from "react";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Video from "./Video";
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import StickyNote2TwoToneIcon from '@mui/icons-material/StickyNote2TwoTone';
import "./Input.css";
import Voice from "./Voice";
import File from "./File";
import { SocketContext } from "./context/SocketContext";
import Sticker from "./Sticker";
import SpeechToText from "./Components/SpeechToText";
import StickerFile from "./StickerFile";
import { UserContext } from "./context/UserContext";
import countries from "./countries";
export default function Input({ setMessage, room, user }) {
     const [text, setText] = useState("");
     const [file, setFile] = useState("");
     const [sticker, setSticker] = useState("");
     const [cred1, setcred1] = useState('');
     const[value,setvalue]=useState()
     const [cred, setcred] = useState("");
     const { socket } = useContext(SocketContext);
     const { current } = useContext(UserContext);
     let min = new Date().getMinutes();
     let hr = new Date().getHours();
     let date = new Date().getDate();
     let month = new Date().getMonth() + 1;
     let year = new Date().getFullYear();
     let dateObj = `${date}/${month}/${year}`;
     const fromlang2 = (e) => {
          setcred(e.target.value);
          console.log(cred);
     }
     if (min < 10) {
          min = "0" + min;
     }
     function sendMessage() {

          socket.emit("send_message", {
               text: text,
               user: current.username,
               room: room,
               time: hr + ":" + min,
               date: dateObj
          });

     }
     function handleChange(e) {
          setText(e.target.value);
          socket.emit("typing", {
               room: room,
               user: user
          });
     }
     function addEmoji(e) {
          setText((prev) => { return prev + e.target.value });
          e.preventDefault();
     }
     function handleForm(e) {
          e.preventDefault();
          let min = new Date().getMinutes();
          let hr = new Date().getHours();
          sendMessage();
          setText("");
     }
     const translate = async () => {
          const url = 'http://localhost:8000/language/detect';
          const response = await fetch(url, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
               },
               body: JSON.stringify({ text: text })
          });
          const json = await response.json();
          setcred1(json[0].language)
          let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${cred1}|${cred}`
          const res = await fetch(apiUrl);
          const data = await res.json();
          setvalue(data.responseData.translatedText);
          setText(data.responseData.translatedText)
          console.log(data.responseData.translatedText);
     }
     return (
          <>
          <button onClick={translate} className="translate">Translate</button>
               <div id="input">
                    <form className="chat-input-form" onSubmit={handleForm}>
                         <AttachFileIcon onClick={() => {
                              document.getElementById("file").style.display = "block";
                         }} id="attach-icon" />
                         <textarea id="chat-input" type="text" placeholder="Write your Message here.." value={text} onChange={handleChange} name="text" />
                         
                         <select className='lang2' onChange={fromlang2}>
                              {Object.entries(countries).map(([code, name], index) => (
                                   <option key={index} value={code}>
                                        {name}
                                   </option>
                              ))}
                         </select>
                         
                        
                         <Voice setMessage={setMessage} room={room} user={user} />
                         <Video setMessage={setMessage} room={room} user={user} />
                         <button id="messagebtn"><SendIcon style={{ color: "whitesmoke ", padding: "2px" }} /></button>
                    </form>
                    <StickyNote2TwoToneIcon onClick={() => {
                         document.getElementById("sticker").style.display = "block";
                    }} />
                    <SpeechToText text={text} setText={setText} setMessage={setMessage} room={room} user={user} id="icon" />
               </div>
               
               <File setMessage={setMessage} room={room} user={user} file={file} setFile={setFile} id="icon" />
               <StickerFile setMessage={setMessage} room={room} user={user} id="icon" />
               <div id="input">
                    <AttachFileIcon onClick={() => {
                         document.getElementById("file").style.display = "block";
                    }} id="attach-icon" />
                    <form className="chat-input-form" onSubmit={handleForm}>

                         <input id="chat-input" type="text" placeholder="Write your Message here.." value={text} onChange={handleChange} name="text" />
                    </form>
                    <EmojiEmotionsIcon value={0} onClick={() => {

                         document.getElementById("emoji").style.display = "block"
                    }} id="emoji-icon" />
                    <Voice setMessage={setMessage} room={room} user={user} />
                    <Video setMessage={setMessage} room={room} user={user} />
                    <button id="messagebtn"><SendIcon style={{ color: "whitesmoke ", padding: "2px" }} /></button>
                    <StickyNote2TwoToneIcon onClick={() => {
                         document.getElementById("sticker").style.display = "block";
                    }} id="sticker-icon" />
                    <SpeechToText text={text} setText={setText} setMessage={setMessage} room={room} user={user} id="icon" />
               </div>
               <File setMessage={setMessage} room={room} user={user} file={file} setFile={setFile} />
               <StickerFile setMessage={setMessage} room={room} user={user} />
          </>
     )
}