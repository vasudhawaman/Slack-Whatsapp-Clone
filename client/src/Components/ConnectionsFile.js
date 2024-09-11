import React,{useState} from 'react'
import './UserFile.css'
import { TiTickOutline } from "react-icons/ti";
const ConnectionFile = ({user}) => {
  const [image, setImage] = useState("https://static.vecteezy.com/system/resources/previews/000/574/512/original/vector-sign-of-user-icon.jpg");
  if (user.image != null) {
    const { image, filename } = user;
    const arrayBuffer = new Uint8Array(image.data);
    const blob = new Blob([arrayBuffer], { type: filename });
    const fr = new FileReader();
    fr.onload = function () {
      setImage(fr.result);
    };
    fr.readAsDataURL(blob);
  }
    const handleonclick=async ()=>{
        const url='http://localhost:8000/register/createroom';
        const response=await fetch(url,{
            method:'POST',
            credentials:'include',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({receiver:user.id})
        })
        const res=await response.json();
    }
    const handleonreject=async()=>{
        const url='http://localhost:8000/register/reject';
        const response= await fetch(url,{
            method:'DELETE',
            credentials:'include',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({receiver:user.id})
        })
        const res=await response.json()
        console.log(res);
    }
  return (
    <div>
      <div className='contain'>
        <img src={image} className='user-image'></img>
        <span className='user'>{user.username}</span>
        <button className='sendreq' onClick={handleonclick}><TiTickOutline/></button>
        <button className='sendreq' onClick={handleonreject}>Reject</button>
      </div>
    </div>
  )
}

export default ConnectionFile
