import React, { useState, useEffect, useContext } from "react";
import './NewInput.css';
import AddIcon from '@mui/icons-material/Add';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Video from "../Video";
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import StickyNote2TwoToneIcon from '@mui/icons-material/StickyNote2TwoTone';
import Emoji from "../Emoji";
import Voice from "../Voice";
import File from "../File";
import { SocketContext } from "../context/SocketContext";
import Sticker from "../Sticker";
import SpeechToText from "../Components/SpeechToText";
import StickerFile from "../StickerFile";
import { UserContext } from "../context/UserContext";
import countries from "../countries";
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

  return (

    <>
      <div className="box-lay">
    
          <div className="list">
          <div className="box-icon">
            <AttachFileIcon onClick={() => {
              document.getElementById("file").style.display = "block";
            }} id="attach-icon" />
          </div>
          <h4>Files</h4>
          </div>
          <div className="list">
          <div className="box-icon">
            <StickyNote2TwoToneIcon onClick={() => {
              document.getElementById("sticker").style.display = "block";
            }} id="sticker-icon" />
          </div>
          <h4>Files</h4>
          </div>
          <div className="list">
          <div className="box-icon">
            <SpeechToText text={text} setText={setText} setMessage={setMessage} room={room} user={user} id="icon" />
          </div>
          <h4>Files</h4>
          </div>
          <div className="list">
          <div className="box-icon"><Voice setMessage={setMessage} room={room} user={user} /></div>
          <h4>Voice record</h4>
          </div>
          <div className="list">
          <div className="box-icon"> <Video setMessage={setMessage} room={room} user={user} /></div>
          <h4>Video Record</h4>
          </div>
          

          <div className="box-icon">
            <EmojiEmotionsIcon value={0} onClick={() => {

              document.getElementById("emoji").style.display = "block"
            }} />
            <Emoji addEmoji={addEmoji} />
          </div>

      </div>
      <div className="input-chat-send">
        <div className="additional">
          <AddIcon />
        </div>
        <input type="text" placeholder="message..." className="chat-input-box" value={text} onChange={handleChange} name="text" />
        <div className="send-icon">
          <SendIcon height="50px" onClick={()=>{
                 sendMessage();
                 setText("");
          }}/>
        </div>
      </div>

      <File setMessage={setMessage} room={room} user={user} file={file} setFile={setFile} />
      <StickerFile setMessage={setMessage} room={room} user={user} />
    </>



  )
}