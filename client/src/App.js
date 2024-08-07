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
    <Route path='/' element={<Home />} />
    <Route path='/call' element={<Videocall />} />
     <Route path='/sticker' element={<Sticker />} /> 
     <Route path='/new' element={<NewHome />} /> 
  </Routes>

</Router>
        </div>
  )
  
}

export default App;
