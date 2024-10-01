import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import AddUser from './AddUser';
import AddUsersTogroup from './AddUsersTogroup';
const AddtoGroup = () => {
    const location = useLocation();
    const groupid = location.pathname.slice(9);
    const [user, setUsers] = useState();
    const [data, setdata] = useState()

    useEffect(() => {
        const url = `${process.env.REACT_APP_BACKEND}/register/allusers`
        const getdata = async () => {
            const response = await fetch(url, {
                method: "GET",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const json = await response.json();

            setUsers(json)
        }
        getdata()
    }, [])

    useEffect(() => {
        setdata(user)
    }, [user])

    return (
        <div>
            <div>
                {data && data.map(u => {
                    return <AddUsersTogroup user={u} groupid={groupid}/>
                })}
            </div>
        </div>
    )
}

export default AddtoGroup
