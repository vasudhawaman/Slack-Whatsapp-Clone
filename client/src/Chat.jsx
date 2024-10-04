import React, { useState, useEffect, useContext,useRef} from "react";
import "./Chat.css"
import Message from "./Message";
import Input from "./Input";
import Profile from "./Profile";
import { SocketContext } from "./context/SocketContext";
import {UserContext} from "./context/UserContext";
import MessageDiv from "./Components/MessageDiv";
import NewInput from "./Components/NewInput";
export default function Chat({message,setMessage,user,room,pfp,group}){
           const bottomRef = useRef(null);
          const {socket} = useContext(SocketContext);
           const [dates,setDates] =useState([]);
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
        console.log("roojoined",room);
        socket.on("date_set",(data)=>{
            setDates(data);
        })
            socket.on("recieve_message",(data)=>{
              
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
                   Promise.all(promiseArr).then((results) => {
                    setMessage(results);
                  });
              
            
            })
            bottomRef.current?.scrollIntoView({behavior: 'smooth'});
           },[socket,message]);
           
    return(
        <>
        <div id="chat">
          <Profile pfp={pfp} user={user} room={room} group={group}/> 
         <div id="all"> 
          <MessageDiv dates={dates} message={message} group={group}/>
         </div>
        </div>
       
        </>
    );
}

