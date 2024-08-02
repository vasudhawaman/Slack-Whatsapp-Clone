import React from "react";
import "./Message.css";
import VoiceToText from "./VoiceToText";
import Pdf from './Pdf';
export default function Message(props){
   
    return(
        <div id="message">
        <div id={props.type}>
            { props.grp ? <div id="user">
                {props.user}
            </div> : null}
           {props.text ? props.text : null}
           { props.file === 'image' ?  <img id='image' width="200px" src={props.source}/> : null}
          { props.file === 'video' ?  <video id='image' width="200px" src={props.source} controls/> : null}
          { props.file === 'audio' ? <><audio id='image' width="200px" src={props.source} controls/>
          <VoiceToText cloudinary={props.cloudinary}/>
          </>  : null}
          { props.file === 'pdf' ?  <Pdf source={props.source} name={props.name} /> : null}
          { props.file === 'other' ?   <a href={props.source} download={props.name} >Download {props.name}</a> : null }
           <div id={props.type} className="time">
            {props.time}
           </div>

        </div>
        </div>
        
    );
}