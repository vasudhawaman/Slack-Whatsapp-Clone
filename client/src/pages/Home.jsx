import React, { useState, useContext, useEffect } from 'react';
import Chat from '../Chat'
import Chatlog from '../Components/Chatlog'
import Navbar from '../Components/Navbar';
import { SocketContext } from "../context/SocketContext";

export default function Home() {
  const [user, setUser] = useState("")
  const [room, setRoom] = useState("")
  const [message, setMessage] = useState([{ text: "Hello right there!", type: "sent", time: "7:58" }, { text: "You only live once", type: "recieve", time: "7:58" }]);
  const { socket } = useContext(SocketContext);
  let min = new Date().getMinutes();
  let hr = new Date().getHours();

  if (min < 10) {
    min = "0" + min;
  }


  function handleSubmit(e) {
    e.preventDefault();
    //localStorage.setItem("user",user);
    socket.emit("join_chat", { room: room, user: user });
  }
  return (
    <>

      <div className="layout">

        <div className="left">
          <form onSubmit={handleSubmit}>
            <input type="text" value={room} onChange={(e) => {
              setRoom(e.target.value);
            }} />
            <input type="text" value={user} onChange={(e) => {
              setUser(e.target.value);
            }} />
            <button>Submit</button>
          </form>
        </div>




        <div className="right">
          <Chat message={message} setMessage={setMessage} user={user} room={room} />
        </div>


      </div>

    </>

  );
}