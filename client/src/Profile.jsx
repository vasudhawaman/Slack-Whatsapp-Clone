import React from "react";
import "./Profile.css";
export default function Profile(props){
     
       return(
         <div id="profile">
            <div id="pic">
                <img src={props.link} />
            </div>
            <div id="username" >
                {props.user}
            </div>
         </div>
       );
}