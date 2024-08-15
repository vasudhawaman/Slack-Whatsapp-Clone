 import React, { useContext, useEffect,useState} from "react";
 import * as tfjs from "@tensorflow/tfjs"
 import * as bodySegmentation from "@tensorflow-models/body-segmentation"
 import { SocketContext } from "./context/SocketContext";
 export default function Sticker({setMessage,user,room,sticker,color}){
   const {socket} =useContext(SocketContext)
    const [final,setFinal]=useState(null);
    const [loading,setLoading]=useState(true)
    const [send,setSend] = useState(false);
    async  function onLoad(){
    
    try{
      const img = document.getElementById('image');
      const segmenterConfig = {
         runtime: 'tfjs', // or 'tfjs'
         solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation',
         modelType: 'general'
       }
      const segmenter = await bodySegmentation.createSegmenter(bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation,segmenterConfig);
      const segmentation = await segmenter.segmentPeople(img);
      const foregroundColor = {r: 0, g: 0, b: 0, a:0};
const backgroundColor = {r:color.r, g:color.g, b:color.b, a: 255};
const backgroundDarkeningMask = await bodySegmentation.toBinaryMask(
    segmentation, foregroundColor, backgroundColor);

const opacity = 0.99;
const maskBlurAmount = 3;
const flipHorizontal = false;
const canvas = document.getElementById('canvas');

await bodySegmentation.drawMask(
    canvas, img, backgroundDarkeningMask, opacity, maskBlurAmount, flipHorizontal);
   
     
      
    } catch(err){
        throw err;
    }
  

   
} 
    
let min =new Date().getMinutes();
let hr = new Date().getHours();

if( min <10){
    min = "0" + min;
}
function sendMessage(dataURL){
   setMessage((prev)=>{ return [...prev ,{
      source:final, //base64URL
      file:'image', //type of file for messages set in img tag/video tag 
      type:"sent",
      time:hr+":"+min,
      mimetype:'image/jpeg'
 }]});

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(',');
       let mime = arr[0].match(/:(.*?);/)[1];
       let bstr = atob(arr[arr.length - 1]);
       let n = bstr.length;
       let  u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
 }
 let myfile = dataURLtoFile(dataURL,'sticker.jpeg');
 console.log(myfile);
  socket.emit("send_message",{ 
   source:myfile, // sent as buffer cant send direct base64URL
   file:'image',
   user: user,
   room:room,
   time:hr+":"+min,
   mimetype:'image/jpeg',
   
 });
     
}
     useEffect(()=>{
     try{
      async function LoadImage() {
         const result = await onLoad();
         if(result) setLoading(false);
         console.log(result);
      }
      LoadImage();
    
     }  catch(err){
        alert("Model not loaded!");
     }
      
     },[loading])
    
     return(
        <div>
        
        <canvas id="canvas" hidden>
        <img src={sticker} id="image" hidden/> 
        
       
        </canvas>
       
         <>
         {final ? 
         <> <img src={final} height="50px" width="50px" /> 
         <button onClick={()=>{
          sendMessage(final);
          
       }}>Send Sticker</button>
       </>
         
         :null }
        {!loading? <button onClick={()=>{
           const canvas = document.getElementById("canvas");
           const dataURL = canvas.toDataURL();
           setFinal(dataURL);
           
        }}>To Sticker</button> : null }
        

         </>
          
             
        
        </div>
        
    )
 }