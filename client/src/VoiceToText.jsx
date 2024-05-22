import React ,{useState}from "react"
import { AssemblyAI } from 'assemblyai'
export default function VoiceToText({cloudinary}){
    const [text,setText] =useState(null);
        
    const client = new AssemblyAI({
        apiKey: "c8ef45894a9741dcab50a155f2a07590"
      })
      const config = {
        audio_url: cloudinary
      }
      
      const run = async () => {
        const transcript = await client.transcripts.create(config)
        setText(transcript.text);
      }
         
      
      
       return(<div id="voiceTotext">  
               {text ? text : null}
             <button type="button" onClick={()=>{
                 run();
             }}>Voice to text</button>
       </div>)
}