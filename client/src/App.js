import React ,{useState}from 'react';
import './App.css';
import Chat from './Chat';
import Chatlog from './Components/Chatlog'
import Navbar from './Components/Navbar';
import Videocall from './Videocall';
function App() {
   const [user,setUser] =useState("")
  return (
    <>
     <div className="container">
      <div className="leftSide">
        <Navbar />
        <Chatlog />
        <input type="text" value={user} onChange={(e)=>{
            setUser(e.target.value);
        }}/>
        
      </div>
      <div className="rightSide">
      <Chat user={user}/>
    </div>
    
   </div>
   {/* <Videocall /> */}
    </>
    
  );
}

export default App;
