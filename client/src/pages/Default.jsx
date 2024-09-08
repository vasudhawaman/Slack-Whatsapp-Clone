import React from 'react'
import './Default.css'
import UseAnimations from "react-useanimations";
import infinity from 'react-useanimations/lib/infinity'
const Default = () => {
  return (
    // <div  className="default">
    //   <div>
    //   <UseAnimations animation={infinity} size={180}  className='infinity'/>
    //     <h1 className='headingpp'>Welcome to Talkpal</h1>
    //     <p>This is developed using React.</p>
    //     <p>Send message and recieve message to/ from your favourite person</p>
    //   </div>
    // </div>
    <div className="animation-wrap">
     <div class="context">
        <h1>Pure Css Animated Background</h1>
    </div>

    <div class="area" >
            <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    </div >
    </div>
  )
}

export default Default
