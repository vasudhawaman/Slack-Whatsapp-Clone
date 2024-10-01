import React,{useEffect,useState} from 'react'
import ConnectionFile from './ConnectionsFile'

const Connection = () => {
    const[user,setUsers]=useState();
    const[data,setdata]=useState()
    const url=`${process.env.REACT_APP_BACKEND}/register/connect`
    useEffect(()=>{
        const getdata=async ()=>{
            const response=await fetch(url,{
                method:'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                  }
            })
            const data=await response.json()
            setUsers(data);
        }
        getdata()
    },[])

    useEffect(()=>{
        setdata(user)
     },[user])
    
  return (
    <div>
      <h1>All Users</h1>
      <p>This page will display all users registered on the platform.</p>
      {data && data.map(u=>{
        return <ConnectionFile user={u}/>
      })}
    </div>
  )
}

export default Connection
