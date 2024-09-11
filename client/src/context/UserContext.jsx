import React, { useEffect, useState, createContext } from 'react';
export const UserContext = createContext();

export const UserContextProvider = (props) => {
    const [current, setCurrent] = useState("");
   
        useEffect(() => {
            const cookies = document.cookie; 
            console.log(cookies);
            if(cookies.token_for_talkpal !==""){
            async function getUserinfo() {
                const url = 'http://localhost:8000/register/getinfo';
                const response = await fetch(url, {
                    method: "GET",
                    credentials: 'include',
                });
                if(response.status===200){
                    const json = await response.json();
                    setCurrent(json);
                }else{
                    setCurrent("");
                }
                
            }
            getUserinfo();
        }else{
            
        }
        }, [])
    return (
        <UserContext.Provider value={{ current }}>
            {props.children}
        </UserContext.Provider>
    )
}