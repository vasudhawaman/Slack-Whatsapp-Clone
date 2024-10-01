import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const GroupComp = (group) => {
  const [image, setImage] = useState(null);
  const navigate = useNavigate()
  const handleonclick = () => {
    navigate(`/adduser/${group.group.groupid}`);
  }
  const seeMember = () => {
    navigate(`/groupmembers/${group.group.groupid}`);
  } 
  useEffect(() => {
    if (group.group.image) {
      const { image, img_mimetype } = group.group;
      const arrayBuffer = new Uint8Array(image.data);
      const blob = new Blob([arrayBuffer], { type: img_mimetype });
      const fr = new FileReader();
      fr.onload = function () {
        setImage(fr.result);
      };
      fr.readAsDataURL(blob);
      setImage(fr.result);
    }
  },[])


  return (
    <div>
      <div className='contain'>
        <img src={image} className='user-image'></img>
        <span className='user'>{group.username}</span>
        <button className='sendreq' onClick={seeMember}>Member</button>
        <button className='sendreq' onClick={handleonclick}>Add Users</button>
      </div>
    </div>
  )
}

export default GroupComp
