import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import MemberOfGroup from './MemberOfGroup';

const Member = () => {
    const location = useLocation();
    const groupid = location.pathname.slice(14);
    const [loading, setLoading] = useState(false);
    const [members, setMembers] = useState([]);
    useEffect(()=>{
        const getData = async () => {
            const url = `http://localhost:8000/register/getmember`;
            const response = await fetch(url, {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ groupid: groupid })
            })
            const data = await response.json()
            setMembers(data);
            console.log(members);
            setLoading(true);
        }
        getData();
    },[loading])
    return (
        <div>
            {members === undefined ? <div>loading...</div> :
                members.map((d) => (
                    <MemberOfGroup user={d} groupid={groupid} />
                ))}
        </div>
    )
}

export default Member
