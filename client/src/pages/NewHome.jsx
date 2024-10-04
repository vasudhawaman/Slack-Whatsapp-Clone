import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './NewHome.css';
import Chat from "../Chat";
import Search from "../Components/Search";
import { SocketContext } from '../context/SocketContext';
import { UserContext } from "../context/UserContext";
import Chatlog from "../Components/Chatlog";
import useWindowDimensions from "../Components/Dimensions";
import Default from "./Default";
import NewInput from "../Components/NewInput";
import UseAnimations from "react-useanimations";
import alertOctagon from 'react-useanimations/lib/alertOctagon';
import ConnectionFile from "../Components/ConnectionsFile";
import { FaUser } from "react-icons/fa";
import UserFile from "../Components/UserFile";
import GroupIcon from '@mui/icons-material/Group';
export default function NewHome() {
  const [user, setUser] = useState()
  const [room, setRoom] = useState("");
  const [group,setGroup] = useState(false);
  const  [pfp,setPFP] = useState(null)
  const { current } = useContext(UserContext);
  const Navigate = useNavigate();
  const dimension = useWindowDimensions();
  const [message, setMessage] = useState([]);
  const [allcontact, setcontact] = useState(false);
  const[allcontacts,setallcontacts]=useState(false);
  const { socket } = useContext(SocketContext);
  let min = new Date().getMinutes();
  let hr = new Date().getHours();
  const [data, setdata] = useState(null);
  const [users1, setusers] = useState();

  useEffect(() => {
    const url = `${process.env.REACT_APP_BACKEND}/register/contacts`;
    const fetchdata = async () => {
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.status === 200) {
        const json = await response.json();
        console.log("contacts",json);
        setdata(json);
      } else {
        Navigate("/signin");
      }

    }
    fetchdata();
  }, [])
  useEffect(()=>{
    async function getGroups(){
      setallcontacts(false);
      setcontact(false);
      const url = `${process.env.REACT_APP_BACKEND}/register/getgroup`;
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
      })
      if (response.status === 200) {
        const json = await response.json();
         setusers(json);
      } else {
        Navigate("/signin");
      }
    }
    if(group) getGroups();
    else{
      setallcontacts(false);
      setcontact(false);
      const url = `${process.env.REACT_APP_BACKEND}/register/contacts`;
      const fetchdata = async () => {
        const response = await fetch(url, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (response.status === 200) {
          const json = await response.json();
          setdata(json);
          console.log("contacts",json);
        } else {
          Navigate("/signin");
        }
  
      }
      fetchdata();
    }
  },[group] );
    
  
  const getAllUsers=()=>{
    setGroup(false);
    setcontact(false);
    if(!allcontacts){
    const url=`${process.env.REACT_APP_BACKEND}/register/allusers`;
      const getdata=async()=>{
        const response=await fetch(url,{
            method: "GET",
            credentials: 'include',
            headers: {
              "Content-Type": "application/json",
            }
        })
        const json=await response.json();
        setdata(json)
      }
      getdata()
    setallcontacts(true);}
      else{
        const url = `${process.env.REACT_APP_BACKEND}/register/contacts`
      const getdata = async () => {
        const response = await fetch(url, {
          method: 'POST',
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          }
        })
        const data = await response.json()
        setdata(data);
        // console.log(data)
        setallcontacts(false)
      }
      getdata()
    }
  }
  const getAllConnection = () => {
    setGroup(false);
    setallcontacts(false)
    if (!allcontact) {
      const url = `${process.env.REACT_APP_BACKEND}/register/connect`
      const getdata = async () => {
        const response = await fetch(url, {
          method: 'POST',
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          }
        })
        const data = await response.json()
        setdata(data);
        setcontact(true)
      }
      getdata()
    }else{
      const url = `${process.env.REACT_APP_BACKEND}/register/contacts`
      const getdata = async () => {
        const response = await fetch(url, {
          method: 'POST',
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          }
        })
        const data = await response.json()
        setdata(data);
        setcontact(false)
      }
      getdata()
    }

  }
  useEffect(() => {
    setusers(data);
    console.log(users1);
  }, [data])

  if (min < 10) {
    min = "0" + min;
  }

  const onClickChat = (d) => {
    document.getElementById("main").style.display = "block";
  }

  useEffect(() => {
     console.log(room);
    if (room) {
      socket.emit("join_chat", { room: room, user: current.username });
    }
  }, [room])


  return (
    <div className="home">

      <section className="main-view">

        <aside className="chat-rooms">
          <Search setGroup={setGroup}/>
          <div className="alluserhere">
            <UseAnimations animation={alertOctagon} size={30} onClick={getAllConnection}/>
            <FaUser  onClick={getAllUsers}/>
            <GroupIcon onClick={()=>{
                  setGroup((prev)=>!prev);
            }} />
          </div>
          <div className="logs">
            {
              !group && !allcontact && !allcontacts && Array.isArray(users1) && users1.map((d) => {
                return (
                  <Chatlog data={d} setRoom={setRoom} setUser={setUser} setPFP={setPFP} onClick={(d) => onClickChat(d)} />
                )
              })
            }
              {!group && allcontact && !allcontacts&& Array.isArray(users1) && users1.map(u=>{
                return <ConnectionFile user={u}/>
              })}
              {!group && allcontacts&& !allcontact && Array.isArray(users1) && users1.map(u=>{
                return <UserFile user={u}/>
              })}
               {
              group && !allcontact && !allcontacts && Array.isArray(users1) && users1.map((d) => {
                return (
                  <Chatlog data={d} setRoom={setRoom} setUser={setUser} setPFP={setPFP} onClick={(d) => onClickChat(d)} group="true"/>
                )
              })
            }
          </div>

        </aside>
        {dimension.width > 600 ? <> {user ?
          <>
            <main className="chat" id="main">
              <Chat message={message} setMessage={setMessage} user={user} room={room} pfp={pfp} group={group}/>

            </main>
            <NewInput  setMessage={setMessage} user={user} room={room}/>
          </>
          : <Default />} </> :
          <>
            <main className="chat" id="main">
              <Chat message={message} setMessage={setMessage} user={user} room={room} pfp={pfp} group={group}/>
            </main>
            <NewInput  setMessage={setMessage} user={user} room={room}/>
          </>}

      </section>
    </div>
  )
  
}