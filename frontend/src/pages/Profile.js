import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { user } from "../reducers/user";

import { NavBar } from "../components/NavBar";
import { AiOutlineEdit } from 'react-icons/ai';

import styled from "styled-components";


export const Profile = () => {
  
    const userProfile = useSelector(state => state.user.userData)

    const [username, setUsername ]= useState(userProfile.username);
    const [email, setEmail ]= useState(userProfile.email);
    const [password, setPassword ]= useState(userProfile.password);
    const [profileType, setProfileType] = useState(userProfile.email);
    const [animalType, setAnimalType] = useState('')
    const [preferableTime, setPreferableTime] = useState([])
    const [startDate, setStartDate] = useState(userProfile.startDate);
    const [endDate, setEndDate] = useState(userProfile.endDate);

    const dispatch = useDispatch();

    const preferTimeOption = ['2-3 hours', ' > 5 hours', 'overnights', 'weekends', 'longer periods'];

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

    const onTimeCheckbox = (time) => {
        if (preferableTime.includes(time)) {
          const timeArray = preferableTime.filter(item => item !== time );
          setPreferableTime(timeArray)
        } 
  
        else setPreferableTime([...preferableTime, time])
    }
    
    return (
        <Container>
            <HeadingContainer>
                <Heading>Your profile information</Heading>
                <button><AiOutlineEdit/></button>
            </HeadingContainer>
            <form onSubmit={onSubmit}>
                <label htmlFor="username">
                    Username
                    <input 
                        id='username'
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}                  
                    />
                </label>
                <label htmlFor="email">
                    Email
                    <input 
                        id='email'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}                  
                    />
                </label>
                <label htmlFor="password">
                    Password
                    <input 
                        id='password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}                  
                    />
                </label>
                
                <div>
                    <label>
                        <input 
                            type='radio'
                            value='Pet owner'
                            checked = {profileType === 'Pet owner'}
                            onChange = {(e) => setProfileType(e.target.value)}                         
                        />
                        Pet owner
                    </label>
                    <label>
                        <input 
                            type='radio'
                            value='Pet sitter'
                            checked = {profileType === 'Pet sitter'}
                            onChange = {(e) => setProfileType(e.target.value)}                         
                        />
                        Pet sitter
                    </label>
                </div>

                <p>Pet information</p>
                <ProfileContainer>
            <RadioLabel htmlFor='dog'>
                <RadioInput
                  id='dog'
                  type = 'radio' 
                  value = 'dog' 
                  checked = {animalType === 'dog'}
                  onChange = {(e) => setAnimalType(e.target.value)}
                />
                Dog
            </RadioLabel>
            <RadioLabel htmlFor='cat'>
            <RadioInput
                id='cat'
                type = 'radio' 
                value = 'cat' 
                checked = {animalType === 'cat'}
                onChange = {(e) => setAnimalType(e.target.value)}
            />
                Cat
            </RadioLabel>
            </ProfileContainer>
            <div className="checkbox-container">
                <P>Duration of pet sitting:*</P>
                {preferTimeOption.map(item => {
                    return <RadioLabel htmlFor={item}>
                            <RadioInput
                            id={item}
                            type='checkbox'
                            value = {item}
                            checked = {preferableTime.includes(item)}
                            onChange = { () => onTimeCheckbox(item) }      
                            />
                            {item}
                            </RadioLabel>
                 })}
            </div>
            <div className="date-container">
              <DateLabel htmlFor="start-date">
                Start Date:*
              </DateLabel>
              <input
                id="start-date"
                className="input"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
             
            </div>
            <div className="date-container">
              <DateLabel htmlFor="end-date">
                End Date:*
              </DateLabel>
              <input
                id="end-date"
                className="input"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
             
            </div>

                
            <button type="submit">Submit</button>
            </form>
        </Container>
    )

}

const Container = styled.div`
  width: 600px;
`

const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Heading = styled.h2`
  font-size: 2.4rem;

`

const P = styled.p`
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 1.6rem;
`
const RadioLabel = styled.label`
  display:flex;
  align-items: center;
  font-size: 14px;
`

const RadioInput = styled.input`
  width: fit-content;
  color:#FD9951;
`

const DateLabel = styled(P)`
  margin: 0 0 0.2rem 0.2rem;
`


const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`

