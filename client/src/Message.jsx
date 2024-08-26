import React,{useContext} from "react";
import "./Message.css";
import VoiceToText from "./VoiceToText";
import Pdf from './Pdf';
import useDownloader from "react-use-downloader";
import DownloadIcon from '@mui/icons-material/Download';
import { UserContext } from "./context/UserContext";
export default function Message(props){
    const {download} = useDownloader();
    const {current} = useContext(UserContext);
    console.log("myself",current);
    console.log("other",props.user)
    let type;
   if(props.file === 'other')  type = props.mimetype.split('/')[1];
    return(
        <>
        { current.username === props.user ?
        <div id="message">
        <div id="sent">
            { props.grp ? <div id="user">
                {props.user}
            </div> : null}
           {props.text ? props.text : null}
           { props.file === 'image' ?  <img id='image' width="200px" src={props.source}/> : null}
          { props.file === 'video' ?  <video id='image' width="200px" src={props.source} controls/> : null}
          { props.file === 'audio' ? <><audio id='image' width="200px" src={props.source} controls/>
          <VoiceToText cloudinary={props.cloudinary}/>
          </>  : null}
          { props.file === 'pdf' ?  <Pdf source={props.source} name={props.name} /> : null}
          { props.file === 'other' ?   
             <>
           <DownloadIcon />
          <a href="#" onClick={()=>{
            console.log(props.name + '.'+type);
            download(props.source,props.name +'.'+ type);
          }}>Download {props.name+ '.'+type}</a> 
          </>: null }
           <div id={props.type} className="time">
            {props.time}
           </div>

        </div>
        </div> : 
        <div id="message">
        <div id="recieve">
            { props.grp ? <div id="user">
                {props.user}
            </div> : null}
           {props.text ? props.text : null}
           { props.file === 'image' ?  <img id='image' width="200px" src={props.source}/> : null}
          { props.file === 'video' ?  <video id='image' width="200px" src={props.source} controls/> : null}
          { props.file === 'audio' ? <><audio id='image' width="200px" src={props.source} controls/>
          <VoiceToText cloudinary={props.cloudinary}/>
          </>  : null}
          { props.file === 'pdf' ?  <Pdf source={props.source} name={props.name} /> : null}
          { props.file === 'other' ?   
             <>
           <DownloadIcon />
          <a href="#" onClick={()=>{
            console.log(props.name + '.'+type);
            download(props.source,props.name +'.'+ type);
          }}>Download {props.name+ '.'+type}</a> 
          </>: null }
           <div id={props.type} className="time">
            {props.time}
           </div>

        </div>
        </div>
}
        </>
    );
}