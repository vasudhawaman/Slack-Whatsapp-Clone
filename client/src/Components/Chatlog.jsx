import React,{useState,useEffect} from 'react';
import './Chatlog.css';
import useWindowDimensions from './Dimensions';

export default function Chatlog({ data, setRoom, setUser }) {
    const dimension = useWindowDimensions();
    const [image1, setImage] = useState('');
        // const { image, filename } = data;
        // const arrayBuffer = new Uint8Array(image.data);
        // const blob = new Blob([arrayBuffer], { type: filename });
        // const fr = new FileReader();
        // fr.onload = function () {
        //     setImage(fr.result);
        // };
        // fr.readAsDataURL(blob);
        // console.log(image1)


    return (
        <>
            {dimension.width < 600 ? <div className="chatlog" onClick={() => {
                console.log("clicked this div");
                const element = document.querySelector(".chat-rooms");
                element.style.display = "none";
                const chat = document.querySelector(".chat");
                const input = document.querySelector("#input");
                const form = document.querySelector(".chat-input-form");
                const profile = document.querySelector("#profile");
    
                chat.style.width = "100%";
                input.style.width = "100%";
                profile.style.display ="flex"
                setUser(data.username);
                setRoom(data.roomid)
            }}>
                
                    <div className='imgProfile'>
                        <img src={image1} height="50px" width="50px" style={{ borderRadius: "100%" }} />
                    </div>
                    <div className='information'>
                        <h1>{data.username}</h1>
                        <p>last message</p>
                    </div>
                    <div className='unread'>
                        <h1></h1>
                        <p>1</p>
                    </div>
              
            </div> : <div className="chatlog" onClick={() => { setUser(data.username); setRoom(data.roomid) }}>
              
                <div className='imgProfile'>
                    <img src={image1} height="30px" width="30px" style={{ borderRadius: "100%" }} />
                </div>
                <div className='information'>
                    <h1>{data.username}</h1>
                    <p>last message</p>
                </div>
                <div className='unread'>
                    <p>1</p>
                </div>
            </div>
           
           }
        </>
    )
}
