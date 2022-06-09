import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { user } from "../reducers/user";

import { NavBar } from "../components/NavBar";
import { AiOutlineEdit } from 'react-icons/ai';

export const Profile = () => {

    const [username, setUsername ]= useState('');

    const dispatch = useDispatch();
    const userProfile = useSelector(state => state.user.userData)

    console.log(userProfile)

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(user.actions.setUserData({ ...userProfile, username}))

        const options = {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                  userId: userProfile.userId,  
                  ...userProfile
                }),
              };
      fetch ('http://localhost:8080/edituser', options)
      .then ((res) => res.json())
      .then ((data) => console.log(data))
      .catch(error => console.log(error))
    }

    return (
        <div>
            <div>
                <h2>Your profile information</h2>
                <button><AiOutlineEdit/></button>
            </div>
            <form onSubmit={onSubmit}>
                <label htmlFor="username">
                    <input 
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}                  
                    />
                </label>
                <button type="submit">Submit</button>
            </form>


        </div>
    )

}

