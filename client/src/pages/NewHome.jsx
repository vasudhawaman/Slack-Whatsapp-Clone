import React, { useState, useContext, useEffect } from "react";
import './NewHome.css';
import Chat from "../Chat";
import Search from "../Components/Search";
import { SocketContext } from '../context/SocketContext';
import Chatlog from "../Components/Chatlog";
import useWindowDimensions from "../Components/Dimensions";
export default function NewHome() {
  const [user, setUser] = useState()
  const [room, setRoom] = useState("")
  // const  dimension = useWindowDimensions();
  const [message, setMessage] = useState([]);
  const users = [{ user: "User 1", time: "1:30" }, { user: "User 2", time: "3:30", lastmessage: "Hello how are you", read: "unread", img: "images/img2.jpg" }, { user: "User 3", time: "11:30", lastMessage: "Where are you right now", read: "", img: "images/img3.jpg" }]
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
      const json = await response.json();
      setdata(json);
    }
    fetchdata();
  }, [])
  useEffect(() => {
    setusers(data);
  }, [data])
  if (min < 10) {
    min = "0" + min;
  }

  const onClickChat=(d)=>{
    document.getElementById("main").style.display = "block";
  }

  useEffect(() => {
    
    if (user && room) {
      console.log(user,room)
      socket.emit("join_chat", { room: room, user: user });
    }
  }, [user, room])
  
  function handleSubmit(e) {
    e.preventDefault();
    socket.emit("join_chat", { room: room, user: user });
  }
  return (
    <div className="home">

      <section className="main-view">

        <aside className="chat-rooms">
          <Search />
          <div className="logs">
            {// document.getElementById("main").style.display = "block";
              Array.isArray(users1) && users1.map((d) => {
                return (
                  <Chatlog data={d} setRoom={setRoom} setUser={setUser} onClick={(d)=>onClickChat(d)} />
                )
              })
            }
          </div>

        </aside>
        <main className="chat" id="main">

          <Chat message={message} setMessage={setMessage} user={user} room={room} />
        </main>
      </section>
    </div>
  )
  //finally grid laggayi yay
}