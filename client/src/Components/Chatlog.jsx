import React from 'react'

export default function Chatlog() {
    const users =[{user:"User 1",time:"1:30"},{user:"User 2",time:"3:30",lastmessage:"Hello how are you",read:"unread",img:"images/img2.jpg"},{user:"User 3",time:"11:30",lastMessage :"Where are you right now",read:"",img:"images/img3.jpg"}]
    return (

        <div className="chatlist">
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
