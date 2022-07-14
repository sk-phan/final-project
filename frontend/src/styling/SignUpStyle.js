import styled from "styled-components"
import { Link } from "react-router-dom"

export const ExitButton = styled.button`
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

export const Main = styled.main`
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

export const FormContainer = styled.div`
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
export const Form = styled.form`
    display:flex;
    flex-direction: column;
    
`

export const FormTitle = styled.h1`
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    letter-spacing: 0.035em;
    text-align:center;
`

export const FormSubTitle = styled.p`
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


export const SignupButton = styled.button`
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
 
export const P = styled.p`
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 1.6rem;
`

export const LinkText = styled(Link)`
    font-family: 'Raleway', sans-serif;
    font-size: 1.6rem;
    color: #FD9951;
    font-weight: 600;
    text-decoration:none;
`


export const RadioLabel = styled.label`
  display:flex;
  align-items: center;
  font-size: 14px;
`

export const RadioInput = styled.input`
  width: fit-content;
  color:#FD9951;
`

export const DateLabel = styled(P)`
  margin: 0 0 0.2rem 0.2rem;
`


export const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`

export const Error = styled.p`
  color: red;
  font-size: 1.4rem;
  margin: 12px;
`

