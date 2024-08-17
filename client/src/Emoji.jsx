import React from "react";
import "./Emoji.css";
import CloseIcon from '@mui/icons-material/Close';
export default function Emoji({addEmoji}){
     
    return(
        <div id="emoji">
            <CloseIcon onClick={()=>{
                document.getElementById("emoji").style.display ="none";
            }} style={{ paddingRight: "2%"}}/>
        <button id="btn" value="😍" onClick={addEmoji}type="button
        " >😍</button>
        <button id="btn"value="😂" onClick={addEmoji} type="button"> 😂</button>
        <button id="btn" value="😃" onClick={addEmoji} type="button">😃</button> 
        <button id="btn" value="😍" onClick={addEmoji}type="button
        " >😍</button>
        <button id="btn"value="😂" onClick={addEmoji} type="button"> 😂</button>
        <button id="btn" value="😃" onClick={addEmoji} type="button">😃</button>    
       </div>
    );
}