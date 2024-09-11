import React from "react";
import './NewInput.css';

import SendIcon from '@mui/icons-material/Send';
export default function NewInput() {

  return (
    <div className="input-chat-send">
      <input type="text" placeholder="message..." className="chat-input-box" />
      <div className="send-icon">
        <SendIcon height="50px"/>
        
      </div>
    </div>


  )
}