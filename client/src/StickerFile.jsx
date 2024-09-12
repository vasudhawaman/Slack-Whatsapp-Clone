import React ,{useState}from "react";
import "./Sticker.css";
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import Sticker from "./Sticker"
export default function StickerFile({setMessage,room,user}){
    const [sticker,setSticker] =useState("");
    const [img,setImgSticky] = useState(false);
    const [color,setColor] = useState(null);
    function handleSticker(e){
        var selectedFile = e.target.files[0];
        var fr = new FileReader();
      
          fr.onload = function () {
            setSticker(fr.result);
         }
         fr.readAsDataURL(selectedFile);
         setImgSticky(true)
    }
    return(
        <div id="sticker">
     <form id="stickerItem">
        <CloseIcon onClick={()=>{
              document.getElementById("sticker").style.display ="none";
              document.getElementById("stickerItem").reset();
              setImgSticky(false);
              setSticker("");
              setColor(null);
              
          }} style={{ paddingLeft: "2%"}}/>
       {color ? <input type="file" name="avatar"  className="sticker-file-input" onChange={handleSticker}/> : null}
        <input type="color" id="favcolor" name="favcolor"  onChange={(e)=>{
                 const hex2rgb = (hex) => {
                    const r = parseInt(hex.slice(1, 3), 16);
                    const g = parseInt(hex.slice(3, 5), 16);
                    const b = parseInt(hex.slice(5, 7), 16);
                    return { r, g, b };
                }
                
               const result = hex2rgb(e.target.value);
               setColor(result);
               console.log(result);
               
        }}/>
       {img && color ? <Sticker setMessage={setMessage} room={room} user={user} sticker={sticker} setSticker={setSticker} color={color}/> : null}
       </form>
       </div>
    )
}