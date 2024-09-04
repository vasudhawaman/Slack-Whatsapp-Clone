import React from "react";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import './Search.css';
import UseAnimations from "react-useanimations";
import alertOctagon from 'react-useanimations/lib/alertOctagon';
import { Link } from "react-router-dom";
export default function Search(){
    return(
        <div className="top">
           <div className="search">
            
            <input className="search-input" type="text" placeholder="Search"  name="text"/>
           
            <Link to="/connection" style={{textDecoration:"none"}}>
            <UseAnimations animation={alertOctagon} size={30} /></Link>
            <Link to="/allusers" style={{textDecoration:"none",}}>
            <svg xmlns="http://www.w3.org/2000/svg" style={{marginTop:"5px"}} width="25" height="25" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 20 20">
          <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
          <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"/>
           </svg>
            </Link>
            {/* <div id="pic">
            <img src="./vasudha.jpg" height="30px" width="30px" style={{borderRadius:"100%"}}/>
            </div> */}
       </div>
     </div>
       
        
           
    )
}