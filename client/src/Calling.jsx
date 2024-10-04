import React, { useEffect, useContext, useRef } from "react";
import { SocketContext } from "./context/SocketContext";
import { useNavigate } from "react-router-dom";
import { Peer } from "peerjs";

export default function Calling({ user, stream }) {
  const peerRef = useRef(null);
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  function addVideoStream(video, stream) {
    const videoGrid = document.getElementById('video-grid');
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
      video.play();
    });
    videoGrid.append(video);
  }

  useEffect(() => {
   
    
    peerRef.current = new Peer(user, {
      host: 'peer-talkpal.onrender.com', 
      secure: true, 
      path: '/',
    });

    const peer = peerRef.current;

    peer.on("call", (call) => {
      call.answer(stream);
      const video = document.createElement('video');
      call.on("stream", (remoteStream) => {
        addVideoStream(video, remoteStream);
      });
      call.on("close", () => {
        video.remove();
        navigate("/");
      });
    });
    socket.on("call-end",(data)=>{
      navigate("/");
  }) 
    // Clean up event listeners to prevent double handling
    return () => {
      peer.destroy();
      socket.off("on-call");
      socket.off("call-end");
    };
  }, [user, stream, socket]);

  useEffect(() => {
    socket.on("on-call", (data) => {
      console.log("on-call", data);
      const call = peerRef.current.call(data.user, stream);
      const video = document.createElement('video');
      call.on("stream", (remoteStream) => {
        addVideoStream(video, remoteStream);
        console.log("called others");
      });
    });

    socket.on("call-end", () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      navigate("/");
    });

    // Clean up to avoid duplicate event listeners
    return () => {
      peerRef.current.destroy();
      socket.off("on-call");
      socket.off("call-end");
    };
  }, [socket, stream, user]);

  return <div className="call"></div>;
}
