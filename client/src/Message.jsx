import React from "react";
import "./Message.css";
export default function Message(props){
   
    return(
        <div id="message">
        <div id={props.type}>
            { props.grp ? <div id="user">
                {props.user}
            </div> : null}
           {props.text}
           <div id={props.type} className="time">
            {props.time}
           </div>
        </div>
        </div>
        
    );
}