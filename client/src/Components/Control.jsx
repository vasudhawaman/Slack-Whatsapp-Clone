import React from "react";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import './Control.css';
export default function Control({videoref}){
    return(
        <div className="video">
           <KeyboardVoiceIcon style={{color:"white"}}/>
           <CameraAltIcon style={{color:"white"}}/>
        </div>
    )
}