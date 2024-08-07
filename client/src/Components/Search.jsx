import React from "react";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import './Search.css';
export default function Search(){
    return(
        <div className="top">
           <div className="search">
            
            <textarea className="search-input" type="text" placeholder="Write your Message here.."  name="text"/>
            <NotificationsActiveIcon />
       </div>
        </div>
       
        
           
    )
}