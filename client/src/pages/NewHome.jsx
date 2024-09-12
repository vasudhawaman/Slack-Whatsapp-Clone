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
import { Link } from "react-router-dom";
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
    const url = `http://localhost:8000/register/contacts`;
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
        console.log(json);
        setdata(json);
      } else {
        Navigate("/signin");
      }

    }
    fetchdata();
  }, [])
  useEffect(()=>{
    async function getGroups(){
      const url = `http://localhost:8000/register/getgroup`;
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
      })
      if (response.status === 200) {
        const json = await response.json();
        console.log("groups",json);
         setusers(json);
      } else {
        Navigate("/signin");
      }
    }
    if(group) getGroups();
    else{
      const url = `http://localhost:8000/register/contacts`;
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
          console.log(json);
          setdata(json);
        } else {
          Navigate("/signin");
        }
  
      }
      fetchdata();
    }
  },[group] );
    
  
  const getAllUsers=()=>{
    if(allcontacts==false){
    const url="http://localhost:8000/register/getgroup";
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
        const url = 'http://localhost:8000/register/contacts'
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
        console.log(data)
        setallcontacts(false)
      }
      getdata()
    }
  }
  const getAllConnection = () => {
    setallcontacts(false)
    if (!allcontact) {
      const url = 'http://localhost:8000/register/connect'
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
        console.log(data)
        setcontact(true)
      }
      getdata()
    }else{
      const url = 'http://localhost:8000/register/contacts'
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
        console.log(data)
        setcontact(false)
      }
      getdata()
    }

  }
  useEffect(() => {
    setusers(data);
  }, [data])

  if (min < 10) {
    min = "0" + min;
  }

  const onClickChat = (d) => {
    document.getElementById("main").style.display = "block";
  }

  useEffect(() => {

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
              { allcontact && !allcontacts&& Array.isArray(users1) && users1.map(u=>{
                return <ConnectionFile user={u}/>
              })}
              {allcontacts&& !allcontact && Array.isArray(users1) && users1.map(u=>{
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
  //finally grid laggayi yay
}