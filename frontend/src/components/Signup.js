
import React, { useState, useEffect } from 'react';
import validator from 'validator'
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { user } from "../reducers/user";
import stylyed from 'styled-components'
import Autocomplete from "react-google-autocomplete";

//SIGNUP
export const Signup = () => {
  const [mode, setMode] = useState("signup");
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
  
  const [emailValid, setEmailValid] = useState(false)

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

  const upload = async (e) => {
    const file = e.target.files[0];
    const base64  = await convertBase64(file)
    setImg(base64)
  }
  const convertBase64 = (file) => {
    return new Promise ((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

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
        }),
      };
      
      fetch("http://localhost:8080/signup", options)
      .then((res) => res.json())
      .then((data) => {
          if (data.success) {
              dispatch(user.actions.setUserData(data.response));
          } else {      
              dispatch(user.actions.setError(data.response))
              dispatch(user.actions.setUserData(null));
          }
        });
    }
  }, [allValid]);


  const onFormSubmit = (e) => {
    e.preventDefault();

    if (password === rePassword) {
      setAllValid(true)
    } else {
      setAllValid(false);
      dispatch(user.actions.setError('password does not match'))  
    }
  };

  //AIzaSyD1tl0DDxF9Y2-n49iIDyrrIPnrcxKQjGw


  //Enable the submit button if all inputs are filled
 
  useEffect(() => {
    setDisable(false)

    if (
      email !== '' && 
      emailValid &&
      username !== '' &&
      password !== '' &&
      animalType !== [] &&
      img !== '' &&
      location !== '' &&
      preferableTime !== [] &&
      startDate !== '' &&
      endDate !== '' &&
      password !== ''      
      ) {
        setDisable(true)
      }
      else setDisable(false)
  }, [ email, username, password, animalType, location, preferableTime, startDate, endDate, password])



  const onTimeCheckbox = (time) => {
      if (preferableTime.includes(time)) {
        const timeArray = preferableTime.filter(item => item !== time );
        setPreferableTime(timeArray)
      } 

      else setPreferableTime([...preferableTime, time])
  }



  return (
       <div>
         <h2>Create an account </h2>
         <p> Make pet experience better </p>

         <form>
           <label htmlFor='Pet sitter'>
            <input 
              id='Pet sitter'
              type = 'radio' 
              value = 'Pet sitter' 
              checked = {profileType === 'Pet sitter'}
              onChange = {(e) => setProfileType(e.target.value)}
            />
            Pet sitter
           </label>
           <label htmlFor='Pet owner'>
            <input 
              id='Pet owner'
              type = 'radio' 
              value = 'Pet owner' 
              checked = {profileType === 'Pet owner'}
              onChange = {(e) => setProfileType(e.target.value)}
            />
            Pet owner
           </label>
           Username
           <input 
             type='text'
             value={username}
             onChange = {(e) => setUsername(e.target.value)}
           />
           <label htmlFor='email'>
             Email
            <input 
              id='email'
              type='email'
              value={email}
              onChange = {(e) => validateEmail(e)}
            />
           </label>
           <label htmlFor='password'>
              Password
              <input 
                id='password'
                type='password'
                value={password}
                onChange = {(e) => setPassword(e.target.value)}
              />
           </label>
           <label htmlFor='rePassword'>
              Re-enter password
              <input 
                id='rePassword'
                type='password'
                value={rePassword}
                onChange = {(e) => setRePassword(e.target.value)}
                required
            />
           </label>
           <label html='img'>
             <input type='file'
                     name="myImage"
                     onChange={(e) => upload(e)}
            />
           </label>
           <span>Pet Information</span>
           <label htmlFor='dog'>
             <input 
                id='dog'
                type='radio'
                value='dog'
                checked = {animalType === 'dog'}
                onChange= {(e) => setAnimalType(e.target.value)}
            />
            Dog
           </label>
           <label htmlFor='cat'>
             <input 
                id='cat'
                type='radio'
                value='cat'
                checked = {animalType === 'cat'}
                onChange= {(e) => setAnimalType(e.target.value)}
            />
            Cat
           </label>
           {preferTimeOption.map(item => {
             return <label htmlFor={item}>
                    <input 
                      type='checkbox'
                      value = {item}
                      checked = {preferableTime.includes(item)}
                      onChange = { () => onTimeCheckbox(item) }      
                    />
                    {item}
             </label>
           })}
           <label htmlFor='start-date'>
              Start date
              <input 
                type = 'date'
                id = 'start-date'
                value={startDate}
                onChange = {(e) => setStartDate(e.target.value)}
              />
           </label>
           <label htmlFor='end-date'>
              End date
              <input 
                type = 'date'
                id = 'end-date'
                value={endDate}
                onChange = {(e) => setEndDate(e.target.value)}
              />
           </label>
           <Autocomplete
                apiKey='AIzaSyCx9GDxuqn4TaVuYIYTb4YGdRGI-YdZIiA'
                onPlaceSelected={(place) => {
                  console.log(place);
                  setLocation(place.formatted_address)
                }}
           />;
           <button type='submit' disabled={!disabled} onClick={onFormSubmit}>Sign up</button>
         </form>
       </div>
  
  );
}
