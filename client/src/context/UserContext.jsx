import React, { useEffect, useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
export const UserContext = createContext();

export const UserContextProvider = (props) => {
    const [current, setCurrent] = useState("");
     const navigate = useNavigate();
        useEffect(() => {
            const cookies = document.cookie; 
            console.log(cookies);
            if(cookies.token_for_talkpal !==""){
            async function getUserinfo() {
                const url = `${process.env.REACT_APP_BACKEND}/register/getinfo`;
                const response = await fetch(url, {
                    method: "GET",
                    credentials: 'include',
                });
                if(response.status===200){
                    const json = await response.json();
                    setCurrent(json);
                }else{
                    setCurrent("");
                    navigate('/signin');
                }
                
            }
            getUserinfo();
        }else{
            navigate('/signin');
        }
        }, [])
    return (
        <UserContext.Provider value={{ current }}>
            {props.children}
        </UserContext.Provider>
    )
}