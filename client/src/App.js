import React ,{useState,useContext,useEffect}from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
import Home from './pages/Home';
import Videocall from './Videocall';
import Sticker from './Sticker'
import NewHome from './pages/NewHome';
function App() {

  return(
        <div>
          <Router>
  <Routes>
    
    <Route path='/call' element={<Videocall />} />
     <Route path='/sticker' element={<Sticker />} /> 
     <Route path='/' element={<NewHome />} />
     <Route path='/home' element={<Home />} /> 
  </Routes>

</Router>
        </div>
  )
  
}

export default App;
