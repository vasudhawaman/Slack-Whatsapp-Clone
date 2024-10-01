import React, { useState ,useContext, useEffect} from "react";
import './Search.css';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
export default function Search({setGroup}) {
  const [image, setimage] = useState();
  const [group, setGroupName] = useState('');
  
  const handleImageChange = (e) => {
    setimage(e.target.files[0]);
  }
  const groupName = (e) => {
    setGroupName(e.target.value);
  }
  const { current } = useContext(UserContext);
  const [userimage, setImage] = useState("https://static.vecteezy.com/system/resources/previews/000/574/512/original/vector-sign-of-user-icon.jpg");
  useEffect(()=>{
    if(current){
      console.log("search",current);
     if(current.image){
      const arrayBuffer = new Uint8Array(current.image.data);
      const blob = new Blob([arrayBuffer], { type: current.filename });
      const fr = new FileReader();
      fr.onload = function () {
        setImage(fr.result);
      };
      fr.readAsDataURL(blob);
      setImage(fr.result);
     }
    }
   
  },[current])
 

  const createGroup = async () => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('group_name', group);
    const url = `${process.env.REACT_APP_BACKEND}/register/creategroup`;
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      // headers: {
      //     'Content-Type': 'application/json',
      // },
      body: formData
    })
    const json = await response.json();
  }

  const getGroup = () => {
    const group = document.querySelector('.group');
    const get = window.getComputedStyle(group);
    if (get.display == 'none') {
      group.style.display = 'block'
    }
    else {
      group.style.display = 'none';
    }
  }
  return (
    <div className="top">
      <div className="search">

        <input className="search-input" type="text" placeholder="Search" name="text" />
        
        <GroupAddIcon  onClick={getGroup} />
        <Link to='/userprofile'>
        <div id="pic">
          <img src={userimage} height="30px" width="30px" style={{ borderRadius: "100%" , marginLeft:'20px'}} />
        </div>
        </Link>
      </div>
      <div className="group">
        <label>Group name:</label>
        <input type="text" onChange={groupName}></input>
        <input class="custom-file-input" type="file" onChange={handleImageChange} />
        <button onClick={createGroup} className="edit">Create Group</button>
      </div>
    </div>



  )
}