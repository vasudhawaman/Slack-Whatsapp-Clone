import React from "react";
import './OnCall.css';
export default function OnCall({videoRef}){
      return(
         <div id="video_user">
          <video class="video" ref={videoRef} autoPlay={true} />
         </div>
      )
}