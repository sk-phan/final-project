import React from "react";
import styled from "styled-components";

const MainPage = () => {
    
    return (
        <Container>
            <Heading>Happy Pet, Happy Life</Heading>
            <Subheading>Lorem ipsum dolor sit amet, 
                consectetur adipiscing elit, sed do 
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Subheading>
            <LoginBtn>Log in</LoginBtn>
            <SignupBtn>Sign up</SignupBtn>

        </Container>
    )
}

export default MainPage

const Container = styled.section`
    width: 100vw;
    min-height: 100vh;
    background-color: #FFFFF6;

`

const Heading = styled.h1`
    font-size: 5.2rem;
    font-family: 'Playfair Display', serif;
    width: 10ch;

`
const Subheading = styled.p`
    font-family: 'Raleway', sans-serif;
    font-size: 1.8rem;
`

const Btn = styled.button`
    font-size: 1.8rem;
    width: 13rem;
    height: 4.8rem;
    border-radius: 10px;

`

const LoginBtn = styled(Btn)`
    background-color: transparent;
    border: solid 2px #4C956C;
`
const SignupBtn = styled(Btn)`
    background-color: #FD9951;
`