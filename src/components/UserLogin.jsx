import React, { useContext, useEffect, useState } from 'react'
import { getAPI } from '../API'
import { UserContext } from '../contexts/User'

const UserLogin = () => {
    const [userList, setUserList] = useState([])
    const {currentUser, setCurrentUser} = useContext(UserContext)

    useEffect(() => {
        const onClick = (event) => {
            setCurrentUser(event.target.value)
        }

        getAPI('users').then(({users})=> {
            const usersArr = users.map((user) => {
                return <li>
                    {(user.username === currentUser) 
                        ? <p>{`Logged in as ${user.username}`}</p> 
                        : <div><p>{user.username}</p><button onClick={onClick} value={user.username}>Log in</button></div>}
                    <img src={user.avatar_url} alt={user.username} />
                </li>
            })

            setUserList(usersArr)
        }) 
    }, [currentUser, setCurrentUser])

    return (
        <ul>
            {userList}
        </ul>
    )
}

export default UserLogin