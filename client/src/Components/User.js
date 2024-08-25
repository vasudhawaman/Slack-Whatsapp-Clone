import React, { useEffect, useState } from 'react';
import './User.css';
import { Link } from 'react-router-dom';
import UserInfoprop from './UserInfoprop';

const User = () => {
    const [info, setInfo] = useState(null); 
    const[image1,setImage1] =useState(null);
    const[image2,setImage]=useState(null);
    useEffect(() => {
        const getUserData = async () => {
                const url = "http://localhost:8000/register/getinfo";
                const response = await fetch(url, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                const { image, filename } = data;
                const arrayBuffer = new Uint8Array(image.data);
                const blob = new Blob([arrayBuffer], { type: filename });
                const fr = new FileReader();
                fr.onload = function () {
                    setImage(fr.result); 
                };
                fr.readAsDataURL(blob);
                setInfo(data);
        };
        getUserData();
    }, []); 
    useEffect(()=>{
        setImage1(image2)
    },[image2])
    return (
        <div>
            <UserInfoprop info={info} image1={image1}/>
        </div>
    );
};

export default User;
