/* ABOVE CODE NOT WORKING BUT THIS DOES  
import './App.css';
/*import Navbar  from './Components/Navbar.js';
import Chatlog from './Components/Chatlog.js';
import Right from './Componenets/Right.js';
function App() {
  return (

    <div className="container">
      <div className="leftSide">
         <Navbar/>
         <Chatlog/>
      </div>
      <div className="rightSide">
          <Right/>
        </div>
      </div>
    

  );
}

export default App; */
import './App.css'
function App() {
  return (
    <div className="container">
      <div className="leftSide">
        <div className="header">
          <div className="userimg">
            <img src="images/user.jpg" className="cover" />
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
        <div className="chatlist">
          <div className="block active">
            <div className="imgbx">
              <img src="images/img1.jpg" className="cover" />
            </div>
            <div className="details">
              <div className="listHead">
                <h4>User 1</h4>
                <p className="time">2:22</p>
              </div>
              <div className="message_p">
                <p>What do you mean</p>
              </div>
            </div>
          </div>
          <div className="block unread">
            <div className="imgbx">
              <img src="images/img2.jpg" className="cover" />
            </div>
            <div className="details">
              <div className="listHead">
                <h4>User2</h4>
                <p className="time">3:33</p>
              </div>
              <div className="message_p">
                <p>mere zikr ka zubaan pe suhag rakhna</p>
                <b>1</b>
              </div>
            </div>
          </div>
          <div className="block unread">
            <div className="imgbx">
              <img src="images/img3.jpg" className="cover" />
            </div>
            <div className="details">
              <div className="listHead">
                <h4>User 3</h4>
                <p className="time">4:44</p>
              </div>
              <div className="message_p">
                <p>El tiempo paso como una estrella fugaz</p>
                <b>1</b>
              </div>
            </div>
          </div>
          <div className="block unread">
            <div className="imgbx">
              <img src="images/img4.jpg" className="cover" />
            </div>
            <div className="details">
              <div className="listHead">
                <h4>User 4 </h4>
                <p className="time">11:00</p>
              </div>
              <div className="message_p">
                <p>I met you in the dark you lit me up you made me feel as tho I was enough</p>
                <b>1</b>
              </div>
            </div>
          </div>
          <div className="block unread">
            <div className="imgbx">
              <img src="images/img5.jpg" className="cover" />
            </div>
            <div className="details">
              <div className="listHead">
                <h4>Fahmi M</h4>
                <p className="time">11:00</p>
              </div>
              <div className="message_p">
                <p>Waalaikumsalam</p>
                <b>1</b>
              </div>
            </div>
          </div>
          <div className="block unread">
            <div className="imgbx">
              <img src="images/img6.jpg" className="cover" />
            </div>
            <div className="details">
              <div className="listHead">
                <h4>M.Ikhsan</h4>
                <p className="time">11:00</p>
              </div>
              <div className="message_p">
                <p>Waalaikumsalam</p>
                <b>1</b>
              </div>
            </div>
          </div>
          <div className="block unread">
            <div className="imgbx">
              <img src="images/img7.jpg" className="cover" />
            </div>
            <div className="details">
              <div className="listHead">
                <h4>Tari</h4>
                <p className="time">11:00</p>
              </div>
              <div className="message_p">
                <p>Waalaikumsalam</p>
                <b>1</b>
              </div>
            </div>
          </div>
          <div className="block unread">
            <div className="imgbx">
              <img src="images/img8.jpg" className="cover" />
            </div>
            <div className="details">
              <div className="listHead">
                <h4>Wisnu</h4>
                <p className="time">11:00</p>
              </div>
              <div className="message_p">
                <p>Waalaikumsalam</p>
                <b>1</b>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rightSide">
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
    </div>

  );
}

export default App; 