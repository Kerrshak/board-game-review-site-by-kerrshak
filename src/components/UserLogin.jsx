import React, { useContext, useEffect, useState } from 'react'
import { getAPI } from '../API'
import { UserContext } from '../contexts/User'

const UserLogin = () => {
    const [userList, setUserList] = useState([])
    const {currentUser, setCurrentUser} = useContext(UserContext)

    const onClick = (event) => {
        setCurrentUser(event.target.value)
    }

    useEffect(() => {
        console.log("useeffect running")
        getAPI('users').then(({users})=> {
            const usersArr = users.map((user) => {
                console.log(user)
                return <li>
                    {(user.username === currentUser) 
                        ? <p>{`Logged in as ${user.username}`}</p> 
                        : <div><p>{user.username}</p><button onClick={onClick} value={user.username}>Log in</button></div>}
                    <img src={user.avatar_url} alt={user.username} />
                </li>
            })

            setUserList(usersArr)
        }) 
    }, [currentUser])

    return (
        <ul>
            {userList}
        </ul>
    )
}

export default UserLogin