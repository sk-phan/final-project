import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";

export const UserDetails = () => {
	const { userId } = useParams()
    const navigate = useNavigate()
    const [user, setUser] = useState()
    const accessToken = useSelector((store) => store.user.accessToken);

    const onBackButtonClick = () => {
        navigate(-1)
    }

    useEffect (() => {
        const options = {
            method: 'GET',
            headers: {
                'Authorization': accessToken
            },
        }
        fetch('http://localhost:8080/users', options)
        .then((res) => res.json())
        .then((data) => {
            console.log(data, userId, 'hellodata')
            const userToShow = data.find(user => user._id === userId)
            setUser(userToShow)
    })
}, [])



    return(
        <main>
            <button onClick={onBackButtonClick}>Back</button>
            {user ? <p>{user.username}</p> : <p>LOADING</p>}
        </main>
    )

}