import React from 'react'

export default function Chatlog() {
    return (

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
    )
}
