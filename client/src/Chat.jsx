import React, { useState, useEffect, useContext } from "react";
import "./Chat.css"
import Message from "./Message";
import Input from "./Input";
import Profile from "./Profile";
import { SocketContext } from "./context/SocketContext";
import {UserContext} from "./context/UserContext";
export default function Chat({message,setMessage,user,room}){
    
      const {socket} = useContext(SocketContext);
     
     
           let min =new Date().getMinutes();
           let hr = new Date().getHours();
           let date = new Date().getDate();
           let month = new Date().getMonth() +1;
           let year = new Date().getFullYear();
           let dateObj = `${date}/${month}/${year}`;
          if( min <10){
               min = "0" + min;
          }
     
      useEffect(()=>{
     
            socket.on("recieve_message",(data)=>{
                // console.log("data",data)
               
                 const promiseArr = data.map((m)=>{
                    return new Promise((resolve) => {
                        if (m.filename !== "txt") {
                            let buffer = [m.file]; // buffer to blob which is then read
                            let blob = new Blob(buffer, { type: m.mimetype });
                            let fr = new FileReader();
                
                            fr.onload = function () {
                                resolve({
                                    source: fr.result,
                                    file: m.type,
                                    time: m.time,
                                    name: m.filename,
                                    mimetype: m.mimetype,
                                    date: m.date,
                                    user: m.user
                                });
                            };
                
                            fr.readAsDataURL(blob);
                        } else {
                            resolve({
                                text: m.text,
                                time: m.time,
                                date: m.date,
                                user: m.user
                            });
                        }
                    })
                   
                 })
                 
                   console.log("promiseArr",promiseArr)
                   Promise.all(promiseArr).then((results) => {
                    setMessage(results);
                  });
              
            
            })
                  
       
           },[socket]);
           
    return(
        <div id="chat">
             <Profile link="pfp.png" user={user} room={room} /> 

         <div id="all"> 
        
         {/* all messages here */}
         { message.length >0 && message.map((m,i)=>{
           
           
            return <Message type={m.type} text={m.text} time={m.time} file={m.file} source={m.source} cloudinary={m.cloudinary} key={i} name={m.name} mimetype={m.mimetype} user={m.user}/>;
         }) }
        
         </div>
         <Input setMessage={setMessage} room={room} user={user}/>
         
        
        </div>
    );
}

