
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, batch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { user } from "../reducers/user";
import styled from 'styled-components'



export const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordShown, setPasswordShown] = useState(false);
  const [showPassword, setShowPassword] = useState(false)


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

    fetch("http://localhost:8080/login", options)
    .then((res) => res.json())
      .then((data) => {
        if (data.success) {
            console.log(data, 'data login')
          batch(() => {
            dispatch(user.actions.setUserData(data.response));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
          });
        } else {
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
            <LoginButton disabled={username === '' || password === ''} type='submit'>Log in</LoginButton>
        </Form>
        <P>Don't have an account? <LinkText to='/signup'>Sign up</LinkText></P>
        </FormContainer>
    </Main>
  );
}

const ExitButton = styled.button`
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
    &:hover{
      background-color: #FD9951;
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
    background:rgba(255,255,255, 0.9);
    position:relative;
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

const Form = styled.form`
    display:flex;
    flex-direction: column;
    
`

const LoginButton = styled.button`
 
    border: none;
    background-color: #FD9951;
    border-radius: 1rem;
    cursor: pointer;
    color: #fff;
    padding: 1.5rem;
    margin: 12px;
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

