import React, {useContext, useState} from 'react';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import './File.css';
import { SocketContext } from "./context/SocketContext";
import { UserContext } from "./context/UserContext";
export function typeOfFile(format){
  switch(format){
       case 'wav':
         return 'audio'
       case 'mp4':
         return 'video'  
       case 'mp3':
         return 'audio'  
       case 'jpg':
          return 'image'  
       case 'jpeg':
              return 'image'  
       case 'png':
         return 'image'   
         case 'pdf':
            return 'pdf'      
        default: 
          return 'other'  
  }
} // for creating ui components in message.jsx


 export default function File({setMessage,room,user,file,setFile}){
     const {socket} =useContext(SocketContext)
     const {current} =useContext(UserContext)
      const [source ,setSrc] = useState("");
      const [type,setType] =useState("");
      const [name,setName] = useState("");
  
function handleChange(event) {
    var selectedFile = event.target.files[0];
    setFile(selectedFile);
    var fr = new FileReader();
   let fileName = selectedFile.name;
   let fileType =fileName.split('.');
   console.log(fileType);
     let newFiletype = typeOfFile(fileType[1]);

     setType(newFiletype);
     setName(fileType[0]);
      fr.onload = function () {
        setSrc(fr.result);
     }
     fr.readAsDataURL(selectedFile);
  
   }
  
  function addTochat(){
           let min =new Date().getMinutes();
           let hr = new Date().getHours();
           let date = new Date().getDate();
           let month = new Date().getMonth() +1;
           let year = new Date().getFullYear();
           let dateObj = `${date}/${month}/${year}`;
          if( min <10){
               min = "0" + min;
          }

           setMessage((prev)=>{ return [...prev ,{
                source:source, //base64URL
                file:type, //type of file for messages set in img tag/video tag 
                type:"sent",
                time:hr+":"+min,
                name:name,
                mimetype:file.type,
                date:dateObj
           }]});
           socket.emit("send_message",{ 
            source:file, // sent as buffer cant send direct base64URL
            file:type,
            user:current.username,
            room:room,
            time:hr+":"+min,
            mimetype:file.type,
            name:name,
            date:dateObj
       });
       setFile("")
       setType("")
       setSrc("")
       setName("")
  }

  return (
    
       <div id="file">
        <form id="form">
          <CloseIcon onClick={()=>{
                document.getElementById("file").style.display ="none";
                document.getElementById("form").reset();
            }} style={{ paddingLeft: "2%"}}/>
          <input type="file" name="avatar"  onChange={handleChange}/>
          { type === 'image' ?  <img id='content' width="200px"/> : null}
          { type === 'video' ?  <video id='content' width="200px" controls/> : null}
    
          <button onClick={addTochat} type="button" id="startVoice"><SendIcon style={{ color : "#ff488b" , padding: "2px"}}/></button>
          </form>
         </div>
         
   
  );
 }