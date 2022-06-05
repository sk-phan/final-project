import React from "react";
import styled from "styled-components";
import heroCat from '../asset/catHero.png'

const MainPage = () => {
    
    return (
        <Main>
                <HeroSection>
                    <HeroContainer>
                        <HeroText>
                            <Logo>Logo</Logo>
                            <Heading>Happy Pet, Happy Life</Heading>
                            <Subheading>Lorem ipsum dolor sit amet, 
                                consectetur adipiscing elit, sed do 
                                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </Subheading> 
                            <BtnContainer>
                                <LoginBtn>Log in</LoginBtn>
                                <SignupBtn>Sign up</SignupBtn>
                            </BtnContainer>
                        </HeroText>
                        <HeroImgContainer>
                            <SecondHeroImg src={heroCat}  alt='cat is sleeping in human arm'/>
                            <HeroImg src='https://images.unsplash.com/photo-1551730459-92db2a308d6a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2487&q=80' alt="happy dog's hoding human hand" />
                        </HeroImgContainer>
                    </HeroContainer>
                </HeroSection>


        </Main>
    )
}

export default MainPage
 
const Main = styled.main`
    width: 100%;
    min-width: 100vw;
`
const Container = styled.div`
    width: 1050px;
    margin: 0 auto;
    display: flex;

    @media (max-width: 375px) {
        width: 300px;
    }
`

const HeroContainer = styled(Container)`
    gap: 20rem;

     &::after {
        content:'';
        position: fixed;
        width: 50rem;
        height: 100vh;
        background-color: #FD9951;
        right: -20px;

        @media (max-width: 375px) {
            display: none;
         }   
    } 
`

const HeroSection = styled.section`
    background: #FFFFF6;
    height: 100vh;

    @media (max-width: 375px) {
       width: 100%;
    }
`

const HeroText = styled.div`
   margin: 6rem 0;
   width: 30%;

   @media (max-width: 500px) {
       display: flex;
       flex-direction: column;
       text-align: center;
    }
`

const Logo = styled.p`
    font-size: 2rem;

    @media (max-width: 500px) {
        text-align: center;
        width: 500px;
    }
`

const Heading = styled.h1`
    font-size: 6.4rem;
    font-family: 'Playfair Display', serif;
    width: 12ch;
    margin-bottom: 2rem;
    letter-spacing: 1px;
    line-height: 1.2;

    @media (max-width: 500px) {
        text-align: center;
        width: 15ch;

    }

   
`
const Subheading = styled.p`
    font-family: 'Raleway', sans-serif;
    font-size: 1.8rem;
    width: 48ch;
    margin-bottom: 7rem;
    letter-spacing: 1px;
    line-height: 1.2;
    color: #555;

`
const BtnContainer = styled.div`
    display: flex;
    gap: 3.1rem;
`

const Btn = styled.button`
    font-size: 1.8rem;
    font-weight: 700;
    width: 13rem;
    height: 4.8rem;
    border-radius: 10px;
`

const LoginBtn = styled(Btn)`
    background-color: transparent;
    border: solid 1.5px #4C956C;
    color: #4C956C;
`
const SignupBtn = styled(Btn)`
    background-color: #FD9951;
    border: none;
    color: #FEFEE3;
`
const HeroImgContainer = styled.div`
   position: relative;
   z-index: 2;
   padding: 6rem;

   @media (max-width: 375px) {
        display: none;
    }
`

const SecondHeroImg = styled.img`
    position: absolute;
    width: 250px;
    bottom: 40px;
    left: -20px;
    z-index: 10;

`

const HeroImg = styled.img`
    height: 735px;
    width: auto;
    border-radius: 18px;
    box-shadow: rgba(149, 157, 165, 0.3) 0px 8px 24px;

`