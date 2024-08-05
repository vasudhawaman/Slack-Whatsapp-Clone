 import React, { useEffect,useRef} from "react";
 import * as tfjs from "@tensorflow/tfjs"
 import * as bodySegmentation from "@tensorflow-models/body-segmentation"
 import * as fabric from "fabric";

 export default function Sticker(){
    const canvasRef = useRef();
    async  function onLoad(){
     const img = document.getElementById('image');
     const segmenterConfig = {
        runtime: 'tfjs', // or 'tfjs'
        solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation',
        modelType: 'general'
      }
     const segmenter = await bodySegmentation.createSegmenter(bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation,segmenterConfig);
     const segmentation = await segmenter.segmentPeople(img);
     
  
const foregroundColor = {r: 0, g: 0, b: 0, a:0};
const backgroundColor = {r: 180, g: 197, b: 288, a: 255};
const backgroundDarkeningMask = await bodySegmentation.toBinaryMask(
    segmentation, foregroundColor, backgroundColor);

const opacity = 0.99;
const maskBlurAmount = 3;
const flipHorizontal = false;
const canvas = document.getElementById('canvas');

await bodySegmentation.drawMask(
    canvas, img, backgroundDarkeningMask, opacity, maskBlurAmount, flipHorizontal);
} 
     useEffect(()=>{
        onLoad();
     },[])
     
     return(
        <>
        <div>
        <canvas id="canvas"  width="100%" height="100%">
         <img src="./vasudha.jpg" id="image"/>
        </canvas>
        </div>
        
          
        </>
        
        
    )
 }