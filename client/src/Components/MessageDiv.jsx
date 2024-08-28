import React ,{useState} from "react";
import Message from "../Message";
import './MessageDiv.css'
export default function MessageDiv({message,dates}){
      return(
          <> 
          {dates.length >0 && dates.map((date)=>{
                return (
                <>
            <div className="message-div">
             <div className="date">{date.date}</div>
              {
                message.length >0 && message.map((m,i)=>{
                    if(m.date === date.date) return <Message type={m.type} text={m.text} time={m.time} file={m.file} source={m.source} cloudinary={m.cloudinary} key={i} name={m.name} mimetype={m.mimetype} user={m.user}/>;
                })
              }
            </div>
                </>
                );
          })  
        }        
          </>
      );
      
}