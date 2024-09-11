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
import Input from "../Input";
import NewInput from "../Components/NewInput";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import UseAnimations from "react-useanimations";
import alertOctagon from 'react-useanimations/lib/alertOctagon';
import ConnectionFile from "../Components/ConnectionsFile";
import { FaUser } from "react-icons/fa";
import UserFile from "../Components/UserFile";
import { Link } from "react-router-dom";
export default function NewHome() {
  const [user, setUser] = useState()
  const [room, setRoom] = useState("")
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
  const getAllUsers=()=>{
    setcontact(false)
    if(!allcontacts){
    const url="http://localhost:8000/register/allusers";
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
          <Search />
          <div className="alluserhere">
            <UseAnimations animation={alertOctagon} size={30} onClick={getAllConnection}/>
            <FaUser  onClick={getAllUsers}/>
          </div>
          <div className="logs">
            {
              !allcontact && !allcontacts && Array.isArray(users1) && users1.map((d) => {
                return (
                  <Chatlog data={d} setRoom={setRoom} setUser={setUser} onClick={(d) => onClickChat(d)} />
                )
              })
            }
              { allcontact && !allcontacts&& Array.isArray(users1) && users1.map(u=>{
                return <ConnectionFile user={u}/>
              })}
              {allcontacts&& !allcontact && Array.isArray(data) && data.map(u=>{
                return <UserFile user={u}/>
              })}
          </div>

        </aside>
        {dimension.width > 600 ? <> {user ?
          <>
            <main className="chat" id="main">
              <Chat message={message} setMessage={setMessage} user={user} room={room} />

            </main>
            <NewInput />
          </>
          : <Default />} </> :
          <>
            <main className="chat" id="main">
              <Chat message={message} setMessage={setMessage} user={user} room={room} />
            </main>
            <NewInput />
          </>}

      </section>
    </div>
  )
  //finally grid laggayi yay
}