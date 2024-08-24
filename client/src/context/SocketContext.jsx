import React ,{createContext,} from 'react';
import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");
export const SocketContext = createContext();

export const SocketContextProvider =(props)=>{
    
    return(
        <SocketContext.Provider value={{socket}}>
            {props.children}
        </SocketContext.Provider>
    )
}