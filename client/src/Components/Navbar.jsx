import React from 'react'
import { MdOutlineGroups2 } from "react-icons/md";
export default  function Navbar() {
  return (
    
        <div className="header">
                <div className="userimg">
                    <img src="images/user.jpg" className="cover"/>
                </div>
                <ul className="nav_icons">
                    <li>
                        <ion-icon name="scan-circle-outline"></ion-icon>
                    </li>
                    <li>
                        <ion-icon name="chatbox"></ion-icon>
                    </li>
                    <li>
                        <ion-icon name="ellipsis-vertical"></ion-icon>
                    </li>
                    
                </ul>
            </div>
    
  )
}
