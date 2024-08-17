import React,{useState,useContext} from "react";
import './NewHome.css';
import Chat from "../Chat";
import Search from "../Components/Search";
import { SocketContext } from '../context/SocketContext';
import Chatlog from "../Components/Chatlog";

export default function NewHome(){
    const [user, setUser] = useState("")
  const [room, setRoom] = useState("")
  const [message, setMessage] = useState([]);
  const users =[{user:"User 1",time:"1:30"},{user:"User 2",time:"3:30",lastmessage:"Hello how are you",read:"unread",img:"images/img2.jpg"},{user:"User 3",time:"11:30",lastMessage :"Where are you right now",read:"",img:"images/img3.jpg"}]
  const { socket } = useContext(SocketContext);
  let min = new Date().getMinutes();
  let hr = new Date().getHours();

  if (min < 10) {
    min = "0" + min;
  }


  function handleSubmit(e) {
    e.preventDefault();
    socket.emit("join_chat", { room: room, user: user });
  }
     return(
          <div className="home">
            
            <section className="main-view">
           
            <aside className="chat-rooms">
            <Search />
            <div className="logs">
            <Chatlog onClick={()=>{
                document.getElementById("main").style.display = "block";
            }}/>
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