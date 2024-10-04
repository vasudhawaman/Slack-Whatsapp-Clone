import React, { useState, useContext } from 'react';
import './Chatlog.css';
import useWindowDimensions from './Dimensions';
import { UserContext } from '../context/UserContext';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
export default function Chatlog({ data, setRoom, setUser,setPFP ,group}) {
    const dimension = useWindowDimensions();
    const {current} =useContext(UserContext);
    const [image1, setImage] = useState('https://static.vecteezy.com/system/resources/previews/000/574/512/original/vector-sign-of-user-icon.jpg');
  if(!group){
    const { image, filename } = data;
    if (image) {
        const arrayBuffer = new Uint8Array(image.data);
        const blob = new Blob([arrayBuffer], { type: filename });
        const fr = new FileReader();
        fr.onload = function () {
            setImage(fr.result);
        };
        fr.readAsDataURL(blob);
    }
  }  else{
    const { image, img_mimetype} = data;
    if (image) {
        const arrayBuffer = new Uint8Array(image.data);
        const blob = new Blob([arrayBuffer], { type: img_mimetype});
        const fr = new FileReader();
        fr.onload = function () {
            setImage(fr.result);
        };
        fr.readAsDataURL(blob);
    }
    
  }


    return (
        <>
        {!group ? 
        <>
            {dimension.width < 600 ? <div className="chatlog" onClick={() => {
                console.log("clicked this div");
                const element = document.querySelector(".chat-rooms");
                element.style.display = "none";
                const chat = document.querySelector(".chat");
                 const input = document.querySelector("#input");
                const profile = document.querySelector("#profile");
                chat.style.width = "100%";
                 input.style.display = "flex";
                profile.style.display = "flex";
                setUser(data.username);
                setRoom(data.roomid);
                setPFP(image1);
            }}>

                <div className='imgProfile'>
                    <img src={image1} height="50px" width="50px" style={{ borderRadius: "100%" }} />
                </div>
                <div className='information'>
                    <h1>{data.username}</h1>
                </div>
               

            </div> : <div className="chatlog" onClick={() => { setUser(data.username); setRoom(data.roomid); setPFP(image1); }}>

                <div className='imgProfile'>
                    <img src={image1} height="25px" width="25px" style={{ borderRadius: "100%"}} />
                </div>
                
                    <h1>{data.username}</h1>
               
                
            </div>

            }
        </> : null }
        {group ? 
        <>
            {dimension.width < 600 ? <div className="chatlog" onClick={() => {
                const element = document.querySelector(".chat-rooms");
                element.style.display = "none";
                const chat = document.querySelector(".chat");
                 const input = document.querySelector("#input");
                const profile = document.querySelector("#profile");
                chat.style.width = "100%";
                 input.style.display = "flex";
                profile.style.display = "flex";
                setUser(data.group_name);
                setRoom(data.group_roomid);
                setPFP(image1);
            }}>

                <div className='imgProfile'>
                    <img src={image1} height="50px" width="50px" style={{ borderRadius: "100%" }} />
                </div>
               
                    <h1>{data.group_name}</h1>
              
              
            </div> : <div className="chatlog" onClick={() => { setUser(data.group_name); setRoom(data.group_roomid) ;setPFP(image1) }}>

                <div className='imgProfile'>
                    <img src={image1} height="30px" width="30px" style={{ borderRadius: "100%" }} />
                </div>
               
                    <h1>{data.group_name}</h1>
             
              {data.adminid === current.id ?  <Link to={`/adduser/${data.group_roomid}`} style={{textDecoration:"none",color:"white",height:"25px",width:"25px",marginLeft:"auto",borderRadius:"100%",paddingRight:"10px",backgroundColor:"#ff488b"
              }}>
                <div className='unread'>
                   
                    <p><AddIcon /></p>
                    
                
                </div>
                </Link>
                : null}
            </div>

            }
        </> : null }
        </>
    )
}
