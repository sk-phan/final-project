import React from "react";
import styled from "styled-components";
import QuotationStart from '../assets/quotation_start.svg';
import QuotationEnd from '../assets/quotation_end.svg'
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
                <ReviewSection>
                        <ReviewContainer>
                            <ReviewHeader>
                                <ReviewTitle>What our users say?</ReviewTitle>
                                <ReviewText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                    sed do eiusmod tempor incididunt ut labore et dolore magna </ReviewText>
                            </ReviewHeader>

                            <ReviewCommentsContainer>
                                <ReviewComment>
                                <ProfileImage src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" />
                                        <Name>Lovisa</Name>
                                        <Profile>Pet owner</Profile>
                                        <Comment><img src={QuotationStart} /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                            <img src={QuotationEnd} /></Comment>
                                </ReviewComment>
                                <ReviewComment>
                                <ProfileImage src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" />
                                        <Name>Lovisa</Name>
                                        <Profile>Pet owner</Profile>
                                        <Comment><img src={QuotationStart} /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                            <img src={QuotationEnd} /></Comment>
                                </ReviewComment>
                                <ReviewComment>
                                        <ProfileImage src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" />
                                        <Name>Lovisa</Name>
                                        <Profile>Pet owner</Profile>
                                        <Comment><img src={QuotationStart} /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                            <img src={QuotationEnd} /></Comment>
                                </ReviewComment>                
                            </ReviewCommentsContainer>
                        </ReviewContainer>
                </ReviewSection> 

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
    height: 100vh;
    padding: 20px;

    @media (max-width: 375px) {
        width: 300px;
    }
`

const HeroContainer = styled(Container)`
    gap: 20rem;

     &::after {
        content:'';
        position: absolute;
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


// Review sections style components:
const ReviewSection = styled.section`
    background: #4C956C;
    height: 75vh;
`
const ReviewContainer = styled(Container)`
    flex-direction: column;
`

const ReviewHeader = styled.div`
    width: 100%;
    height: 20vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    height: 20vh;

    
`

const ReviewTitle = styled.h2`
    font-size: 3.6rem;
    color: #FEFEE3;
    text-align: center;

`

const ReviewCommentsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 55vh;
    align-items: center;
`

const ReviewComment = styled.div`
    width: 28rem;
    height: 35rem;
    background-color: #FFFFF6; s
    border-radius: 2rem;
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    box-sizing: border-box;
    padding: 1.5rem;
`

const ReviewText = styled.p`
    font-family: 'Raleway', sans-serif;
    font-size: 1.8rem;
    color: #FEFEE3;
    width: 50ch;
    text-align: center;
`

const ProfileImage = styled.img`
    width:12rem;
    height:12rem;
    object-fit:cover;
    overflow:hidden;
    border-radius: 50%;
`

const Name = styled.p`
    font-size: 1.8rem;
    font-family: 'Raleway', sans-serif;
    font-weight: 700;
    margin:0.5rem;
`
const Profile = styled.p`
    font-weight: 400;
    font-size: 1.4rem;
    font-family: 'Raleway', sans-serif;
    color: 666666;
    margin:0;
`
const Comment = styled.p`
    font-family: 'Raleway', sans-serif;
    font-style: italic;
    font-weight: 400;
    font-size: 1.4rem;
    width:30ch;
    text-align: center;
    
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
    width: 100%;
    height: auto;
    border-radius: 18px;
    box-shadow: rgba(149, 157, 165, 0.3) 0px 8px 24px;

`