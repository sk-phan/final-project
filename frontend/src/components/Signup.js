
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { user } from "../reducers/user";
import styled from 'styled-components'

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

  const preferTimeOption = ['2-3 hours', ' > 5 hours', 'overnights', 'weekends', 'longer periods'];

  const onFormSubmit = (e) => {

    console.log(username, password)
    e.preventDefault();
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
        console.log(data)
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserData(data.response));
  
          });
        } else {
          batch(() => {
            dispatch(user.actions.setUserData(null));
          });
        }
      });
  };


  const onTimeCheckbox = (time) => {
      if (preferableTime.includes(time)) {
        const timeArray = preferableTime.filter(item => item !== time );
        setPreferableTime(timeArray)
      } 

      else setPreferableTime([...preferableTime, time])
  }
  console.log(password, username, 'test')

  return (
    <Main>
       <FormContainer>
         <FormTitle> Create an account </FormTitle>
         <FormSubTitle> Make pet experience better </FormSubTitle>
         <Form>
             <div className="radio-container">
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
                Username
              </label>
            </div>
            <div className="input-container">
              <input
                id="email"
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label className="user-label" htmlFor="email">
                Email
              </label>
            </div>
            <div className="input-container">
              <input
                id="password"
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="user-label" htmlFor="password">
                Password
              </label>
            </div>
            <div className="input-container">
              <input
                id='rePassword'
                className="input"
                type="rePassword"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                required
              />
              <label className="user-label" htmlFor="rePassword">
                Re-enter password
              </label>
            </div>
            
            <div className="input-container">
           
             <input type='file'
                     name="myImage"
                     onChange={(e) => upload(e)}
            />
             <label htmlFor='img' className="user-label">
               Profile image
            </label>
          </div>
          <div className="radio-container">
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
           </div >
           
           
           <div className="checkbox-container">
           {preferTimeOption.map(item => {
             return <RadioLabel htmlFor={item}>
                    <RadioInput
                      type='checkbox'
                      value = {item}
                      checked = {preferableTime.includes(item)}
                      onChange = { () => onTimeCheckbox(item) }      
                    />
                    {item}
             </RadioLabel>
           })}
           </div>

           <div className="input-container">
              <input
                id="start-date"
                className="input"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
              <label className="user-label" htmlFor="start-date">
                Start Date
              </label>
            </div>
           
            <div className="input-container">
              <input
                id="end-date"
                className="input"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
              <label className="user-label" htmlFor="end-date">
                End Date
              </label>
            </div>

          
           <SignupButton type='submit' onClick={onFormSubmit}>Sign up</SignupButton>
         </Form>
         <P>Have an account? <LinkText>Log in</LinkText></P>
       </FormContainer>

    </Main>

  );
}

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
    border-box: box-sizing;
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
    margin: 12px;
    font-weight: 600;
    font-size: 1.6rem;
`

const P = styled.p`
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 1.6rem;
`

const LinkText = styled.span`
    font-family: 'Raleway', sans-serif;
    font-size: 1.6rem;
    color: #FD9951;
    font-weight: 600;
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