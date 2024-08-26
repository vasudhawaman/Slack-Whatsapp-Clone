import React from "react";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import './Search.css';
import UseAnimations from "react-useanimations";
import alertOctagon from 'react-useanimations/lib/alertOctagon';
export default function Search(){
    return(
        <div className="top">
           <div className="search">
            <textarea className="search-input" type="text" placeholder="Write your Message here.."  name="text"/>
            <UseAnimations animation={alertOctagon} size={40} />            
       </div>
     </div>
       
        
           
    )
}