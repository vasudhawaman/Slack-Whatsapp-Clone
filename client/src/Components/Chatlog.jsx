import React, { useState, useEffect } from 'react';
import './Chatlog.css';
import useWindowDimensions from './Dimensions';

export default function Chatlog({ data, setRoom, setUser }) {
    const dimension = useWindowDimensions();
    const [image1, setImage] = useState('https://static.vecteezy.com/system/resources/previews/000/574/512/original/vector-sign-of-user-icon.jpg');
    const { image, filename } = data;
    if (image) {
        const arrayBuffer = new Uint8Array(image.data);
        const blob = new Blob([arrayBuffer], { type: filename });
        const fr = new FileReader();
        fr.onload = function () {
            setImage(fr.result);
        };
        fr.readAsDataURL(blob);
        console.log(image1)
    }


    return (
        <>
            {dimension.width < 600 ? <div className="chatlog" onClick={() => {
                console.log("clicked this div");
                const element = document.querySelector(".chat-rooms");
                element.style.display = "none";
                const chat = document.querySelector(".chat");
                const input = document.querySelector("#input");
                const voice = document.querySelector("#startVoice");
                const video = document.querySelector("#startVideo");
                const attach = document.querySelector("#attach-icon");
                const sticker = document.querySelector("#sticker-icon");
                const speech = document.querySelector("#speech-icon");
                const emoji = document.querySelector("#emoji-icon");
                const sendMessage = document.querySelector("#messagebtn");
                const form = document.querySelector(".chat-input-form");
                const profile = document.querySelector("#profile");

                chat.style.width = "100%";
                input.style.width = "100%";
                profile.style.display = "flex";
                voice.style.display = "block";
                video.style.display = "block";
                attach.style.display = "block";
                sendMessage.style.display ="block";
                sticker.style.display ="block";
                emoji.style.display ="block";
                speech.style.display ="block";
                setUser(data.username);
                setRoom(data.roomid);
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
