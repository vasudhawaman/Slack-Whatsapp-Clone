import React, { useState } from 'react'

const CreateGroup = () => {
    const [image,setimage]=useState();
    const [group,setGroupName]=useState('');
    const handleImageChange=(e)=>{
        setimage(e.target.files[0]);
    }
    const groupName=(e)=>{
        setGroupName(e.target.value);
    }
    const createGroup=async()=>{
        const formData=new FormData();
        formData.append('file',image);
        formData.append('group_name',group);
        const url="http://localhost:8000/register/creategroup";
        const response=await fetch(url,{
            method: 'POST',
            credentials: 'include',
            body: formData
        })
        const json =await response.json();
        console.log(json);
    }
  return (
    <div>
        <label for='group_name'>Group name</label>
      <input id='group_name' name='group_name' onChange={groupName}></input>
      <input type='file' name='image' onChange={handleImageChange}></input>
      <button type='submit' onClick={createGroup}>Create group</button>
    </div>
  )
}

export default CreateGroup
