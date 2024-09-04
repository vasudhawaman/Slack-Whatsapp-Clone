import React,{useEffect, useState} from 'react'
import UserFile from './UserFile';

const Allusers = () => {
    const[user,setUsers]=useState();
    const[data,setdata]=useState()

    useEffect(() => {
      const url="http://localhost:8000/register/allusers"
      const getdata=async()=>{
        const response=await fetch(url,{
            method: "GET",
            credentials: 'include',
            headers: {
              "Content-Type": "application/json",
            }
        })
        const json=await response.json();
        
        setUsers(json)
      }
      getdata()
    }, [])
    
    useEffect(() => {
      setdata(user)
    }, [user])
    
  return (
    <div className="user-header">
      <h1>All Users</h1>
      <p>This page will display all users registered on the platform.</p>
      {data && data.map(u=>{
        return <UserFile user={u}/>
      })}
    </div>
  )
}

export default Allusers
