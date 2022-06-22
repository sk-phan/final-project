
import React, { useState, useEffect } from 'react';
import validator from 'validator'
import { useSelector, useDispatch, batch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { user } from "../reducers/user";
import Autocomplete from "react-google-autocomplete";
import styled from 'styled-components';

import { API_URL } from '../utils/url';

export const Signup = () => {
  const [profileType, setProfileType] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [animalType, setAnimalType] = useState("")
  const [location, setLocation] = useState("hello")
  const [preferableTime, setPreferableTime] = useState([])
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [password, setPassword] = useState("")
  const [rePassword, setRePassword] = useState("")
  const [img, setImg] = useState("")
  const [description, setDescription] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)
  
  const [emailValid, setEmailValid] = useState(false)

  const [disabled, setDisable] = useState(false)
  const [allValid, setAllValid] = useState(false)

  const accessToken = useSelector((store) => store.user.accessToken);
  const error = useSelector((store) => store.user.error)

  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (accessToken) {
      navigate("/userpage");
    }
  }, [accessToken, navigate]);

  


  const validateEmail = (e) => {
    setEmail(e.target.value)

    if(validator.isEmail(email)) {
      setEmailValid(true)
      dispatch(user.actions.setError(''))
    } else {
      setEmailValid(false)
      dispatch(user.actions.setError('Enter valid email'))
    }
  }


  const preferTimeOption = ['2-3 hours', ' > 5 hours', 'overnights', 'weekends', 'longer periods'];

  useEffect(() => {
    if (allValid) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profileType: profileType,
          username: username,  
          email: email,
          animalType: animalType,
          location: location,
          preferableTime: preferableTime,
          startDate: startDate,
          endDate: endDate,
          password: password,
          img: img,
          description: description,
          favourites: [],
        }),
      }
      
      fetch(API_URL('signup'), options)
      .then((res) => res.json())
      .then((data) => {
          if (data.success) {

            batch(() => {
              dispatch(user.actions.setAccessToken(data.response.accessToken));
              dispatch(user.actions.setUserData(data.response));
              dispatch(user.actions.setError(''))
            });
          } else {  
            batch(() => {
              dispatch(user.actions.setError(data.response))
              dispatch(user.actions.setUserData(null));
            })    
          }
        })
      .catch(error => console.log(error))
      .finally(() => {
        setUsername('')
        setPassword('')
      })
    }

  }, [allValid]);


  const onFormSubmit = (e) => {
    e.preventDefault();

    if (password === rePassword && emailValid) {
      setAllValid(true)
      dispatch(user.actions.setError(''))  

    } else {
      setAllValid(false);
      dispatch(user.actions.setError('password does not match'))  
    }
  };


  //Enable the submit button if all inputs are filled
 
  useEffect(() => {
    if (
      email === '' || 
      username === '' ||
      password === '' ||
      animalType === [] ||
      location === '' ||
      preferableTime === [] ||
      startDate === '' ||
      endDate === '' ||
      password === ''      
      ) {
        setDisable(false)
        dispatch(user.actions.setError('Please fill in all required input'))

      } else {
        setDisable(true)

      }
  }, [ email, username, password, animalType, location, preferableTime, startDate, endDate, password])



  const onTimeCheckbox = (time) => {
      if (preferableTime.includes(time)) {
        const timeArray = preferableTime.filter(item => item !== time );
        setPreferableTime(timeArray)
      } 

      else setPreferableTime([...preferableTime, time])
  }

  const onClickShowPassword = () => {
    if(showPassword){
      setShowPassword(false)
    } else {
      setShowPassword(true)
    }
  }
  
  const onClickShowRePassword = () => {
    if(showRePassword){
      setShowRePassword(false)
    } else {
      setShowRePassword(true)
    }
  }


  return (
    <Main>
      <FormContainer>
        <ExitButton onClick={() => navigate('/')}>X</ExitButton>
        <FormTitle> Create an account </FormTitle>
        <FormSubTitle> Make pet experience better </FormSubTitle>
        <Form>
            <div className="date-container">
              <P>Choose profile type:</P>
              <ProfileContainer>
              <RadioLabel htmlFor='Pet sitter'>
                <RadioInput
                  id='Pet sitter'
                  type = 'radio' 
                  value = 'Pet sitter' 
                  checked = {profileType === 'Pet sitter'}
                  onChange = {(e) => setProfileType(e.target.value)}
                />
                Pet sitter
              </RadioLabel>
              <RadioLabel htmlFor='Pet owner'>
              <RadioInput
                id='Pet owner'
                type = 'radio' 
                value = 'Pet owner' 
                checked = {profileType === 'Pet owner'}
                onChange = {(e) => setProfileType(e.target.value)}
              />
              Pet owner
            </RadioLabel>
            </ProfileContainer>
          </div >
          <div className="input-container">
              <input
                id="username"
                className="input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label className="user-label" htmlFor="username">
                Username*
              </label>
            </div>
            <div className="input-container">
              <input
                id="email"
                className="input"
                type="email"
                pattern=".+@globex\.com"
                value={email}
                onChange={(e) => validateEmail(e)}
                required
              />
              <label className="user-label" htmlFor="email">
                Email*
              </label>
            </div>
            <div className="input-container">
              <input
                id="password"
                className="input"
                type={!showPassword ? "password" : "text"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="button" onClick={onClickShowPassword} className="show-button">{!showPassword ? <span>Show</span> : <span>Unshow</span>}</button>
              <label className="user-label" htmlFor="password">
                Password*
              </label>
            </div>
            <div className="input-container">
              <input
                id="rePassword"
                className="input"
                type={!showRePassword ? "password" : "text"}
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                required
              />
              <button type="button" onClick={onClickShowRePassword} className="show-button">{!showRePassword ? <span>Show</span> : <span>Unshow</span>}</button>
              <label className="user-label" htmlFor="rePassword">
                Re-enter password*
              </label>
            </div>
            
            <div className="input-container"> 
              <input  
                      className = "input"
                      id="image"
                      type="text"
                      value={img}
                      onChange={(e) => setImg(e.target.value)}
                      required
              />   
              <label className="user-label" htmlFor="image">
                Profile Image Address*
              </label>        
          </div>

         

          <div className="date-container">
          <P>Choose your pet type:*</P>
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
           </div >
           
           
           <div className="checkbox-container">
             <P>Duration of pet sitting:*</P>
           {preferTimeOption.map(item => {
             return <RadioLabel key={item} htmlFor={item}>
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

           <div className="input-container">
            <Autocomplete
                  apiKey='AIzaSyCx9GDxuqn4TaVuYIYTb4YGdRGI-YdZIiA'
                  className="inputLocation"
                  placeholder=''
                  onPlaceSelected={(place) => {
                    setLocation(place.formatted_address)
                  }}
            />         
              <label className="user-label" htmlFor="description">
                Location
              </label>
            </div>
            <div className="date-container">
              <DateLabel htmlFor="description">
                Profile description:
              </DateLabel>
              <textarea
                className="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Tell more about yourself/your pet..."
              />
             
            </div>
            <Error>{error}</Error>
            <SignupButton type='submit' disabled={!disabled} onClick={onFormSubmit}>Sign up</SignupButton> 
         </Form>
         <P>Have an account? <LinkText to='/login'>Log in</LinkText></P>
       </FormContainer>

    </Main>

  );
}

const ExitButton = styled.button`
    display:flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: black solid;
    width: 3rem;
    height: 3rem;
    position: absolute;
    right:1.5rem;
    top:1.5rem;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background-color: #F5F5F5;
    font-weight: 600;
    cursor:pointer;
      background-color: #F5F5F5;
    &:hover{
      background-color: #FD9951;
      cursor: pointer;
    }
`

const Main = styled.main`
    width: 100%;
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url("https://images.unsplash.com/photo-1551730459-92db2a308d6a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80") no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
`

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 2rem;    
    width: 35rem;
    box-sizing: border-box;
    padding: 2rem;
    margin:2rem;
    background:rgba(255,255,255, 0.9);
    position:relative;
`
const Form = styled.form`
    display:flex;
    flex-direction: column;
    
`

const FormTitle = styled.h1`
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    letter-spacing: 0.035em;
    text-align:center;
`

const FormSubTitle = styled.p`
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #666666;
    margin: 0 0 2rem 0;
    padding:0;
`


const SignupButton = styled.button`
    border: none;
    background-color: #FD9951;
    border-radius: 1rem;
    cursor: pointer;
    color: #fff;
    padding: 1.5rem;
    margin: 24px 12px 12px 12px;
    font-weight: 600;
    font-size: 1.6rem;

    &:disabled {
      background-color: #fdc7a0;
    }

    &:hover {
      background-color: #ec8941;
    }
`
 
const P = styled.p`
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 1.6rem;
`

const LinkText = styled(Link)`
    font-family: 'Raleway', sans-serif;
    font-size: 1.6rem;
    color: #FD9951;
    font-weight: 600;
    text-decoration:none;
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

const Error = styled.p`
  color: red;
  font-size: 1.4rem;
  margin: 12px;
`

