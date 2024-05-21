import React from 'react'
// import 
export default function Right() {
  return (
    <div>
      
            <div className="header">
                <div className="imgText">
                    <div className="userimg">
                        <img src="images/img1.jpg" className="cover"/>
                    </div>
                    <h4>User 1<br/><span>Online</span></h4>
                </div>
                <ul className="nav_icons">
                    <li>
                        <ion-icon name="search-outline"></ion-icon>
                    </li>
                    <li>
                        <ion-icon name="ellipsis-vertical"></ion-icon>
                    </li>
                </ul>
            </div>

            
            <div className="chatBox">
                <div className="message my_message">
                    <p>Hi<br/><span>11:00</span></p>
                </div>
                <div className="message friend_message">
                    <p>Hello<br/><span>11:00</span></p>
                </div>
                <div className="message my_message">
                    <p>Hey bro ,wassup , how are you ? ,It's been a while since we have spoken <br/><span>11:00</span></p>
                </div>
                <div className="message friend_message">
                    <p>Let's meet tomorrow at 4:30 at starcbucks . Do bring your laptop , We gotta complete the work<br/><span>11:00</span></p>
                </div>
            </div>
            <div className="chatbox_input">
                <ion-icon name="happy-outline"></ion-icon>
                <ion-icon name="attach-outline"></ion-icon>
                <input type="text" placeholder="Type a message"/>
                <ion-icon name="mic-outline"></ion-icon>
            </div>
        </div>
    
  )
}
