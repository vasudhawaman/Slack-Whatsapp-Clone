import React, { useState } from 'react'
import EmojiPicker from 'emoji-picker-react';
import '../Emoji.css';
import useWindowDimensions from "./Dimensions";
import { FaClosedCaptioning } from 'react-icons/fa';
import CloseIcon from '@mui/icons-material/Close';
export default function Emoji1({ setText }) {
    const dimension = useWindowDimensions();

    return (
        <>
            {dimension.width < 600 ? <div id="emoji">
                <CloseIcon onClick={() => {
                    document.getElementById("emoji").style.display = "none";
                }} />
                <EmojiPicker width={100} onEmojiClick={(emojiObject) => setText((prevMsg) => prevMsg + emojiObject.emoji)} />
            </div>
                : <div id="emoji">
                    <CloseIcon onClick={() => {
                        document.getElementById("emoji").style.display = "none";
                    }} />
                    <EmojiPicker width={300} onEmojiClick={(emojiObject) => setText((prevMsg) => prevMsg + emojiObject.emoji)} />
                </div>
            } </>


    )
}