import React, {useState} from 'react';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import './File.css';
 export default function File({setMessage}){
  
      const [source ,setSrc] = useState("");
      const [type,setType] =useState("");

  function typeOfFile(format){
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
  }
function handleChange(event) {
    var selectedFile = event.target.files[0];
    var fr = new FileReader();
   let fileName = selectedFile.name;
   let fileType =fileName.split('.');
   console.log(fileType);
     let newFiletype = typeOfFile(fileType[1]);
     setType(newFiletype);
     if(type !=='pdf'){
      fr.onload = function () {
        setSrc(fr.result);
      //   document.getElementById('content').src =fr.result;
     }
     fr.readAsDataURL(selectedFile);
 
     }else{
        const blobUrl = URL.createObjectURL(selectedFile);
        setSrc(blobUrl);
     }
    
   }
  
  function addTochat(){
    let min =new Date().getMinutes();
           let hr = new Date().getHours();
           const height =  document.getElementById("message").offsetHeight;
          
           window.scrollTo(window.innerWidth,window.innerHeight + height);
          if( min <10){
               min = "0" + min;
          }

          console.log(type);
           setMessage((prev)=>{ return [...prev ,{
                source:source,
                file:type,
                type:"sent",
                time:hr+":"+min
           }]});
  }

  return (
    
       <div id="file">
          <CloseIcon onClick={()=>{
                document.getElementById("file").style.display ="none";
            }} style={{ paddingLeft: "2%"}}/>
          <input type="file" name="avatar" onChange={handleChange}/>
          { type === 'image' ?  <img id='content' width="200px"/> : null}
          { type === 'video' ?  <video id='content' width="200px" controls/> : null}
          <button onClick={addTochat} type="button" id="startVoice"><SendIcon style={{ color : "whitesmoke " , padding: "2px"}}/></button>
          
         </div>
         
   
  );
 }