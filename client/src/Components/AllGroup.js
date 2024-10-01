import React, { useEffect, useState } from 'react'
import GroupComp from './GroupComp';

const AllGroup = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getGroups = async () => {
            const url = `${process.env.REACT_APP_BACKEND}/register/allgroup`;
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const json = await response.json();
            setData(json);
            if (data === undefined) {
                setLoading(true);
            }
        }
        getGroups();
    }, [loading])
    return (
        <div>
            {data === undefined ? <div>loading...</div> :
                data.map((d) => (
                    <GroupComp group={d} />
                ))}
        </div>
    )
}

export default AllGroup
