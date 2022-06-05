import React from "react";
import styled from "styled-components";
import QuotationStart from '../assets/quotation_start.svg';
import QuotationEnd from '../assets/quotation_end.svg'




const MainPage = () => {
    
    return (
        <Main>
                <HeroSection>
                    <Container>
                        <Heading>Happy Pet, Happy Life</Heading>
                        <Subheading>Lorem ipsum dolor sit amet, 
                            consectetur adipiscing elit, sed do 
                            eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </Subheading>
                        <LoginBtn>Log in</LoginBtn>
                        <SignupBtn>Sign up</SignupBtn>
                    </Container>
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
    width: 100vw;
`
const Container = styled.div`
    width: 1024px;
    margin: 0 auto;
    display: flex;
`

const HeroSection = styled.section`
    background: red;

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
    font-weight: 700;
    width: 13rem;
    height: 4.8rem;
    border-radius: 10px;
`

const LoginBtn = styled(Btn)`
    background-color: transparent;
    border: solid 1.5px #4C956C;
    color: #4C956C;
    margin-right: 3.2rem;
`
const SignupBtn = styled(Btn)`
    background-color: #FD9951;
    border: none;
    color: #FEFEE3;
`

// Review sections style components:
const ReviewSection = styled.section`
    background: #4C956C;
    height: 100vh;
`
const ReviewContainer = styled(Container)`
    flex-direction: column;
`

const ReviewHeader = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 30vh;

`

const ReviewTitle = styled.h2`
    font-size: 3.6rem;
    color: #FEFEE3;
    text-align: center;

`

const ReviewCommentsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 70vh;
    align-items: center;
`

const ReviewComment = styled.div`
    width: 28rem;
    height: 35rem;
    background-color: #FFFFF6;
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