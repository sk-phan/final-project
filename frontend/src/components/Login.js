import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { user } from "../reducers/user";
import { API_URL } from '../utils/url';

import { ExitButton, Main, FormContainer, FormTitle, FormSubTitle,
  Form, LoginButton, P, LinkText, Error } from '../styling/LoginStyle';


export const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')


  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  useEffect(() => {
    if (accessToken) {
      navigate("/userpage");
    }
  }, [accessToken, navigate]);

  
  const onFormSubmit = (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        username, 
        password,
      }),
    };

    fetch(API_URL('login'), options)
    .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserData(data.response));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
          });
        } else {
          setErrorMessage('data.response')
          batch(() => {
            dispatch(user.actions.setUserData(null));
            dispatch(user.actions.setAccessToken(null));
          });
        }
      });
  };

  const onClickShowPassword = () => {
    if(showPassword){
      setShowPassword(false)
    } else {
      setShowPassword(true)
    }
  }


  return (
    <Main>
        <FormContainer>
            <ExitButton onClick={() => navigate('/')}>X</ExitButton>
            <FormTitle>Welcome back!</FormTitle>
            <FormSubTitle>Make pet experience better</FormSubTitle>
        <Form onSubmit={onFormSubmit}>
            <div className="input-container">
              <input
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
                className="input"
                type={!showPassword ? "password" : "text"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="button" onClick={onClickShowPassword} className="show-button">{!showPassword ? <span>Show</span> : <span>Unshow</span>}</button>
              <label className="user-label" htmlFor="username">
                Password
              </label>
              
                
            </div>
            <Error>{errorMessage}</Error>
            <LoginButton disabled={username === '' || password === ''} type='submit'>Log in</LoginButton>
        </Form>
        <P>Don't have an account? <LinkText to='/signup'>Sign up</LinkText></P>
        </FormContainer>
    </Main>
  );
}

