// import React from "react";
// import * as tf from "@tensorflow/tfjs"

// import * as bodyPix from "@tensorflow-models/body-pix";

// export default function Sticker(){
//    async  function onLoad(){
//     const canvas = document.getElementById("canvas")
//          const net = await bodyPix.load();
//          console.log("loaded");
//          const person = net.segmentMultiPersonParts('vasudha.jpg')
//          const blackBackground = bodyPix.toColoredPartMask(person);
//          bodyPix.drawMask(
//             canvas,
//             'vasudha.jpg',
//             blackBackground,
//             0.7,
//             0,
//             false
//          )
//     } 
//     onLoad();
//     return(
//         <div id="canvas" s>
//           <button type="button">Create sticker</button>
//         </div>
        
//     )
// }