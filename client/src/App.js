import React, { useState, useContext, useEffect } from 'react';
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
import Welcome from './Components/Welcome'
import Terms from './Components/Terms';
import Welcome2 from './Components/Welcome2';
import OTP from './Components/OTP';
import OTP1 from './Components/Otp1';
import Password from './Components/Password';
import User from './Components/User';
import ForgetPass from './Components/Forgetpass';
import Emoji1 from './Components/Emoji';
import Allusers from './Components/Allusers';
import Connection from './Components/Connection'
import EditProfile from './Components/EditProfile';
import Status from './Components/Status'
import CreateGroup from './Components/CreateGroup';
import AllGroup from './Components/AllGroup';
import AddtoGroup from './Components/AddtoGroup';
import Member from './Components/Member';
function App() {
  const [otpState, setOtpState] = useState(null);
  const [otp1, setotp] = useState(null)
  return (
    <div>
      <Router>
        <Routes>

          <Route path='/call' element={<Videocall />} />
          <Route path='/sticker' element={<Sticker />} />
          <Route path='/' element={<NewHome />} />
          <Route path='/home' element={<Home />} />
          <Route path="/register" element={<Welcome setOtpState={setOtpState} />} />
          <Route path="/t&c" element={<Terms />} />
          <Route path="/signin" element={<Welcome2 />} />
          <Route path="/otp" element={<OTP otpState={otpState} />} />
          <Route path='/forget' element={<ForgetPass setotp={setotp} />} />
          <Route path='/otp1' element={<OTP1 otp1={otp1} />} />
          <Route path='/password' element={<Password otp1={otp1} />} />
          {/* <Route path='/userprofile' element={<User />} /> */}
          <Route path='/status' element={<Status/>}/>
          <Route path='/emoji' element={<Emoji1 />} />
          <Route path='/allusers' element={<Allusers />} />
          <Route path='/connection' element={<Connection />} />
          <Route path='/userprofile' element={<EditProfile/>}/>
          <Route path='/creategroup' element={<CreateGroup/>}/>
          <Route path='/allgroup' element={<AllGroup/>}/>
          <Route path='/adduser/:id' element={<AddtoGroup/>}/>
          <Route path='/groupmembers/:id' element={<Member/>}/>
        </Routes>

      </Router>
    </div>
  )

}

export default App;
