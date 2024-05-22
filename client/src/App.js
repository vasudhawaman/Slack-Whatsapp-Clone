import React ,{useState}from 'react';
import './App.css';
import Chat from './Chat';
import Chatlog from './Components/Chatlog'
import Navbar from './Components/Navbar';
function App() {
  
  return (
    <div className="container">
      <div className="leftSide">
        <Navbar />
        <Chatlog />
        
      </div>
      <div className="rightSide">
      <Chat />
    </div>
   </div>
  );
}

export default App;
