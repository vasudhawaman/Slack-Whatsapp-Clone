import React, { useState } from 'react'
import EmojiPicker from 'emoji-picker-react';
import { MdEmojiEmotions } from "react-icons/md";

export default function Emoji1() {
    const [Emoji, isEmoji] = useState(false)
    const show = () => {
        isEmoji(!Emoji)
    }
    const [value, setValue] = useState('');

    const handleclick = (e) => {
        console.log(value)
        setValue(e.target.value)
    }

    return (
        <div>
            {Emoji ? (<>
                <EmojiPicker onEmojiClick={(emojiObject) => setValue((prevMsg) => prevMsg + emojiObject.emoji)} />
                <input
                    type='text'
                    value={value}
                    onChange={handleclick}
                />
                </>
            ) : (
                <input
                    type='text'
                    value={value}
                    onChange={handleclick}
                />
            )}
            <MdEmojiEmotions onClick={show} />
        </div>
    )
}