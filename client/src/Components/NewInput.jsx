import React from "react";
import './NewInput.css';
import SendIcon from '@mui/icons-material/Send';
export default function NewInput(){

    return (
        <div className="input-box">
            <input className="input-area" type="text" placeholder="Send Message"/>
            <button >
            <SendIcon style={{ color : "whitesmoke ",fontSize:"1.3em"
            }}/>
            </button>
        </div>
    )
}