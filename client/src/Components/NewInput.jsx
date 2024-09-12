import React, { useState, useEffect, useContext } from "react";
import './NewInput.css';
import AddIcon from '@mui/icons-material/Add';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import Video from "../Video";
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import StickyNote2TwoToneIcon from '@mui/icons-material/StickyNote2TwoTone';
import Emoji from "./Emoji.js";
import Voice from "../Voice";
import File from "../File";
import { SocketContext } from "../context/SocketContext";
import Sticker from "../Sticker";
import SpeechToText from "../Components/SpeechToText";
import StickerFile from "../StickerFile";
import { UserContext } from "../context/UserContext";
import countries from "../countries";
import DetectLanguage from 'detectlanguage';
const detectlanguage = new DetectLanguage('ec0c97301141116fd5cb97645cdf6f8c');

export default function NewInput({ setMessage, room, user }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState("");
  const [sticker, setSticker] = useState("");
  const [cred1, setcred1] = useState('');
  const [value, setvalue] = useState()
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
  
  function handleForm(e) {
    e.preventDefault();
    let min = new Date().getMinutes();
    let hr = new Date().getHours();
    sendMessage();
    setText("");
  }
  const translate = async () => {
   
    const json =  await detectlanguage.detect(text);
    // setcred1(json.language)
    console.log(json)
    let detected = json[0].language;
    let convert =cred.split("-");
    let cred2 = convert[0];
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${json[0].language}|${cred2}`;
    console.log(cred);
    const res = await fetch(apiUrl);
    const data = await res.json();
    setvalue(data.responseData.translatedText);
    setText(data.responseData.translatedText)
    console.log(data.responseData.translatedText);
}
  return (

    <>
      <div className="box-lay" id="file-input"> 
        <div className="list"  onClick={()=>{
                document.getElementById("file-input").style.display ="none";
            }}>
           <CloseIcon />
        </div>
       
        <div className="list" onClick={() => {
              document.getElementById("file").style.display = "block";
            }}>
          <div className="box-icon">
         
            <AttachFileIcon  id="attach-icon" />
          </div>
          <h4>Files</h4>
        </div>

        <div className="list" onClick={() => {
              document.getElementById("sticker").style.display = "block";
            }}>
          <div className="box-icon">
            <StickyNote2TwoToneIcon  id="sticker-icon" />
          </div>
          <h4>Sticker</h4>
        </div>
        <div className="list">
          <div className="box-icon">
            <SpeechToText text={text} setText={setText} setMessage={setMessage} room={room} user={user} id="icon" />
          </div>
          <h4>Speech to text</h4>
        </div>
        <div className="list">
          <div className="box-icon"><Voice setMessage={setMessage} room={room} user={user} /></div>
          <h4>Voice record</h4>
        </div>
        <div className="list">
          <div className="box-icon"> <Video setMessage={setMessage} room={room} user={user} /></div>
          <h4>Video Record</h4>
        </div>
        <div className="list" >
              
          <select className='lang2' onChange={fromlang2} >
                              {Object.entries(countries).map(([code, name], index) => (
                                   <option key={index} value={code}>
                                        {name}
                                   </option>
                              ))}
                         </select>
                         <h4 style={{backgroundColor:"#ff488b" ,padding:"5px",border:"3px"}} onClick={translate}>Translate</h4>
         
        </div>
      </div>
      <div className="input-chat-send" id="input">
        <EmojiEmotionsIcon value={0} onClick={() => {

          document.getElementById("emoji").style.display = "block"
        }} />
        <Emoji setText={setText} />
        <div className="additional">
          <AddIcon onClick={()=>{
             document.getElementById("file-input").style.display="block";
          }}/>
        </div>
        <input type="text" placeholder="message..." className="chat-input-box" value={text} onChange={handleChange} name="text" />
        <div className="send-icon">
          <SendIcon height="50px" onClick={() => {
            sendMessage();
            setText("");
          }} />
        </div>
      </div>

      <File setMessage={setMessage} room={room} user={user} file={file} setFile={setFile} />
      <StickerFile setMessage={setMessage} room={room} user={user} />
    </>



  )
}