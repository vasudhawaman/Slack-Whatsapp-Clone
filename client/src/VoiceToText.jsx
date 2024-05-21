import React from "react"



// npm install assemblyai

import { AssemblyAI } from 'assemblyai'




export default function VoiceToText({messages}){
    
        
    const client = new AssemblyAI({
        apiKey: "c8ef45894a9741dcab50a155f2a07590"
      })
      
      function convert(){
          document.getElementById("startVoice").click()
         document.getElementById('textTotext').style.display ="none";
         document.getElementById('startVoice').style.display ="none"
         document.getElementById('stop').addEventListener("click",(e)=>{
               let l = messages.length;
               const audioUrl = messages[l-1].source;

        
      
      const config = {
        audio_url: audioUrl
      }
      
      const run = async () => {
        const transcript = await client.transcripts.create(config)
        console.log(transcript.text)
      }
      

         })
      }
      
      
       return(<>
          <button id="voiceTotext" type="button" onClick={convert}>Voice to text</button>
       </>)
}