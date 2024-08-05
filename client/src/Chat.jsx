import React,{useState,useEffect, useContext} from "react";
import "./Chat.css"
import Message from "./Message";
import Input from "./Input";
import Profile from "./Profile";
import { SocketContext } from "./context/SocketContext";

export default function Chat({message,setMessage,user,room}){
    
      const {socket} = useContext(SocketContext);
     
      let min =new Date().getMinutes();
           let hr = new Date().getHours();
           
          if( min <10){
               min = "0" + min;
          }
     
      useEffect(()=>{
     
            socket.on("recieve_message",(data)=>{
                console.log("here")

                if(!data.file){
                        setMessage((prev)=>{ return [...prev ,{text:data.text, type :"recieve",time: hr +":"+min }] }) 
                        }else{
                            console.log(typeof(data.source))
                                 let buffer = [data.source];
                             let blob = new Blob(buffer,{type:data.mimetype});
                                let fr = new FileReader();
                                 fr.onload = function () {
                                  
                                     setMessage((prev)=>{ return [...prev ,{
                                         source:fr.result,
                                         file:data.file,
                                         type:"recieve",
                                         time:hr+":"+min,
                                       
                                    }]});
                                         
                                   }
                                   fr.readAsDataURL(blob);           
                  }
                })
                  
       
           },[socket]);
           
    return(
        <div id="chat">
        <Profile  link="pfp.png" user={user}/>

         <div id="all"> 
         <Message type="sent" text ="Hello how are you doing right now!" time="8:59" />
         <Message type="recieve" text ="welcome" time="8:59" />
         <Message type="recieve" text ="welcome" time="8:59" grp="true" user="vasudha"/>
         <Message type="sent" text ="welcome" time="8:59" grp="true" user="vasudha"/>
         {/* all messages here */}
         {message.map((m,i)=>{
           
           
            return <Message type={m.type} text={m.text} time={m.time} file={m.file} source={m.source} cloudinary={m.cloudinary} key={i} />;
         }) }
         
         </div>
        
         <Input setMessage={setMessage} room={room} user={user}/>
        </div>
    );
}

