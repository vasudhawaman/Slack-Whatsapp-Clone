import React from "react";
 export default function Chatdisplay({user,time,lastmessage,read,img}){
       return(
        <div className={read}>
        <div className="imgbx">
            <img src="images/img1.jpg" className="cover" />
        </div>
        <div className="details">
            <div className="listHead">
                <h4>{user.username}</h4>
                <p className="time">{time}</p>
            </div>
            <div className="message_p">
                <p>{lastmessage}</p>
            </div>
        </div>
    </div>
       );
 }