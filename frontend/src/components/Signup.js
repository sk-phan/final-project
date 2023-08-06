
import React, { useState, useEffect } from 'react';
// import validator from 'validator'
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { user } from "../reducers/user";
import Autocomplete from "react-google-autocomplete";

import { API_URL } from '../utils/url';

import { Main, ExitButton, FormContainer, Form,
  FormTitle, FormSubTitle, SignupButton, P, LinkText, 
  RadioLabel, RadioInput, DateLabel, ProfileContainer, Error } from '../styling/SignUpStyle';

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
  const [error, setError] = useState('')
  const [showRePassword, setShowRePassword] = useState(false)
  
  // const [emailValid, setEmailValid] = useState(false)

  const [disabled, setDisable] = useState(false)
  const [allValid, setAllValid] = useState(false)

  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (accessToken) {
      navigate("/userpage");
    }
  }, [accessToken, navigate]);

  


  const validateEmail = (e) => {
    setEmail(e.target.value)

    // if(validator.isEmail(email)) {
    //   setEmailValid(true)
    //   setError('')
    // } else {
    //   setEmailValid(false)
    //   setError('Please enter valid email')
    // }
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
            setError('')
            batch(() => {
              dispatch(user.actions.setAccessToken(data.response.accessToken));
              dispatch(user.actions.setUserData(data.response));
            });
          } else {  
            batch(() => {
              dispatch(user.actions.setUserData(null));
            })    
            setError(data.response)
          }
        })
      .catch(error => console.log(error))
      
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allValid, error]);


  const onFormSubmit = (e) => {
    e.preventDefault();

    setAllValid(true)
    // if (password === rePassword && emailValid) {
    //   setAllValid(true)
    //   setError('')
    // } else if (password !== rePassword) {
    //   setAllValid(false);
    //   setError('password does not match')
    // } else {
    //   setAllValid(false);
    //   setError('Please enter valid email')
    // }
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
        setError('Please fill in all required input')

      } else {
        setError('')
        setDisable(true)

      }
  }, [ email, username, animalType, location, preferableTime, startDate, endDate, password])



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

