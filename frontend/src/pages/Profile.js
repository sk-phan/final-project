import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { user } from "../reducers/user";

import { NavBar } from "../components/NavBar"
import { AiOutlineEdit } from 'react-icons/ai';

import styled from "styled-components"


export const Profile = () => {
  
    const userProfile = useSelector(state => state.user.userData)

    const [updatedData, setUpdatedData] = useState(null);
    const [username, setUsername ]= useState(userProfile.username);
    const [email, setEmail ]= useState(userProfile.email);
    const [password, setPassword ]= useState(userProfile.password);
    const [profileType, setProfileType] = useState(userProfile.profileType);
    const [animalType, setAnimalType] = useState('')
    const [preferableTime, setPreferableTime] = useState([])
    const [startDate, setStartDate] = useState(userProfile.startDate);
    const [endDate, setEndDate] = useState(userProfile.endDate);
    const [img, setImg] = useState(userProfile.img)

    const dispatch = useDispatch();

    const preferTimeOption = ['2-3 hours', ' > 5 hours', 'overnights', 'weekends', 'longer periods'];

    

    const onSubmit =  (e) => {
        e.preventDefault();

        const options = {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                  userId: userProfile.userId,  
                  preferableTime: preferableTime,   
                  endDate: startDate,
                  startDate: startDate,
                  email: email,
                  profileType: profileType,
                  username: username, 
                  password: password,
                }),
              };
      fetch ('http://localhost:8080/edituser', options)
      .then ((res) => res.json())
      .then ((data) => {
        if (data.success) {
          setUpdatedData(data.response)
          dispatch(user.actions.setError(''))
        } else {
          dispatch(user.actions.setError('Update failed'))
        }
      })
      .catch(error => console.log(error))
    }

    // useEffect(() => {
    //   dispatch(user.actions.setUserData({...updatedData}))
    // }, [updatedData] )

    const onTimeCheckbox = (time) => {
        if (preferableTime.includes(time)) {
          const timeArray = preferableTime.filter(item => item !== time );
          setPreferableTime(timeArray)
        }     
        else setPreferableTime([...preferableTime, time])
      }

    return (
        <Container>
          <Side>
            <ReviewHeading>Your reviews</ReviewHeading>
            <Reviews>
              <img src="https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" alt="reviewer image" />
              <div>
                <Name>@Alice</Name>
                <ReviewText>
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                  molestiae quas vel sint commodi repudiandae consequuntura" 
                </ReviewText>
              </div>
            </Reviews>
  
          </Side>
          <FormContainer>
            <HeadingContainer>
                <Heading>Profile information</Heading>
            </HeadingContainer>
            <Form onSubmit={onSubmit}>
              <Header>
                <ProfileImg src={img}/>
                <div>
                  <Name>@{username}</Name>
                  <UserType>{profileType}</UserType>
                </div>
              </Header>
                <Label htmlFor="username">
                    Username
                    <input 
                        id='username'
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}                  
                    />
                </Label>
                <Label htmlFor="email">
                    Email
                    <input 
                        id='email'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}                  
                    />
                </Label>
                <Label htmlFor="password">
                    Password
                    <input 
                        id='password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}                  
                    />
                </Label>
                

                <Heading>Pet information</Heading>
                <ProfileContainer>
                
                <InputContainer>
                  <P>Animal type:</P>
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
                </InputContainer>
            </ProfileContainer>
            <div>
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
            <Label htmlFor='start-date'>
                Start Date:*
              <input
                id="start-date"
                className="input"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
             
            </Label>
            <Label htmlFor="end-date">
                End Date:*
              <input
                id="end-date"
                className="input"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
             
            </Label>

                
            <SubmitBtn type="submit">Update</SubmitBtn>
            </Form>
          </FormContainer>
        
        </Container>
    )

}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  
  `
const FormContainer = styled.div`
  width: 60%;
  height: 100vh;
  align-self: flex-end;
  padding: 6rem 4rem 4rem 4rem;
  box-sizing: border-box;
  overflow: scroll;
`
const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  padding-bottom: 4rem;
`


const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Heading = styled.h2`
  font-size: 2.4rem;
  margin: 0 0 4rem 0;

`
const Form = styled.form`
  display: flex;
  flex-direction: column;
 
`

const ProfileImg = styled.img`
  width: 12rem;
  height: 12rem;
  object-fit: cover;
  border-radius: 50%;
`

const InputContainer = styled.div`
  display: flex;
  align-self: flex-start;
  width: 100%;
  gap: 5rem;
  margin-left: 12px;
`

const Label = styled(Form)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 3.2rem;
  gap: 5rem;
  font-size: 1.6rem;

  input {
    align-self: flex-end;
  }
  
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
const SubmitBtn = styled.button`
    border: none;
    width: 15rem;
    background-color: #FD9951;
    border-radius: 1rem;
    cursor: pointer;
    color: #fff;
    padding: 1.5rem;
    font-weight: 600;
    font-size: 1.6rem;

    &:disabled {
      background-color: #fdc7a0;
    }

    &:hover {
      background-color: #ec8941;
    }

`

const Side = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6rem 4rem 4rem 4rem;
  box-sizing: border-box;
  

`
const Name = styled.p`
  font-size: 2.4rem;
  font-weight: 700;
  margin: 2rem 0 1rem 0;
`
const UserType = styled.span`
    font-size: 1.6rem;
`

const Reviews = styled.div`
  background-color: #e5f2eb;
  width: 34rem;
  height: 18rem;
  padding: 2rem;
  box-sizing: border-box;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  overflow: scroll;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  img {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
  }

  p {
    margin: 0 0 1rem 0;
    font-size: 1.6rem;
  }
`

const ReviewHeading = styled.h2 `
  font-size: 2.4rem;
  align-self: flex-start;
  margin: 0 0 4rem 4rem;
`

const ReviewText = styled.p`
    color: #333;
`