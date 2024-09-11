import React, { useState } from "react";
import './Search.css';
import { HiUserGroup } from "react-icons/hi2";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
export default function Search({setGroup}) {
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
        
        <GroupAddIcon  onClick={getGroup} />
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