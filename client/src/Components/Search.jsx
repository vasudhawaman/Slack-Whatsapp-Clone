import React, { useContext, useState } from "react";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import './Search.css';
import UseAnimations from "react-useanimations";
import alertOctagon from 'react-useanimations/lib/alertOctagon';
import { Link } from "react-router-dom";
import { HiUserGroup } from "react-icons/hi2";
import { UserContext } from "../context/UserContext";

export default function Search() {
  const { current } = useContext(UserContext);
  const [userimage, setImage] = useState("https://static.vecteezy.com/system/resources/previews/000/574/512/original/vector-sign-of-user-icon.jpg");
  if(current){
  const arrayBuffer = new Uint8Array(current.image.data);
  const blob = new Blob([arrayBuffer], { type: current.filename });
  const fr = new FileReader();
  fr.onload = function () {
    setImage(fr.result);
  };
  fr.readAsDataURL(blob);
}
  const [image, setimage] = useState();
  const [group, setGroupName] = useState('');
  const handleImageChange = (e) => {
    setimage(e.target.files[0]);
  }
  const groupName = (e) => {
    setGroupName(e.target.value);
  }

  const createGroup = async () => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('group_name', group);
    const url = "http://localhost:8000/register/creategroup";
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      // headers: {
      //     'Content-Type': 'application/json',
      // },
      body: formData
    })
    const json = await response.json();
    console.log(json);
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

        {/* <Link to="/connection" style={{ textDecoration: "none" }}>
          <UseAnimations animation={alertOctagon} size={30} /></Link>
        <Link to="/allusers" style={{ textDecoration: "none", }}>
          <svg xmlns="http://www.w3.org/2000/svg" style={{ marginTop: "5px" }} width="25" height="25" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 20 20">
            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
            <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5" />
          </svg>
        </Link> */}
        <HiUserGroup size={30} onClick={getGroup} />
          <Link to='/userprofile'>
        <div id="pic">
          <img src={userimage} height="30px" width="30px" style={{ borderRadius: "100%" }} />
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