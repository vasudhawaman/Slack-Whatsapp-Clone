import React ,{createContext,} from 'react';
import io from "socket.io-client";
const socket = io.connect(`${process.env.REACT_APP_BACKEND}`);
export const SocketContext = createContext();

export const SocketContextProvider =(props)=>{
    
    return(
        <SocketContext.Provider value={{socket}}>
            {props.children}
        </SocketContext.Provider>
    )
}