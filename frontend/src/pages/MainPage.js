import React, {useState} from "react";
import styled from "styled-components";
import heroCat from '../asset/catHero.png'
import balls from '../assets/decoration_balls.svg'
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";


const MainPage = () => {

    const navigate = useNavigate();
    const [accordion1, setAccordion1] = useState(false)
    const [accordion2, setAccordion2] = useState(false)
    const [accordion3, setAccordion3] = useState(false)
    const [accordion4, setAccordion4] = useState(false)

    const onAccordionClick1 = () => {
        if(accordion1) {
            setAccordion1(false)
        } else {
            setAccordion1(true)
        }
    }

    const onAccordionClick2 = () => {
        if(accordion2) {
            setAccordion2(false)
        } else {
            setAccordion2(true)
        }
    }

    const onAccordionClick3 = () => {
        if(accordion3) {
            setAccordion3(false)
        } else {
            setAccordion3(true)
        }
    }

    const onAccordionClick4 = () => {
        if(accordion4) {
            setAccordion4(false)
        } else {
            setAccordion4(true)
        }
    }

    return(
        <Main>
            <BigContainer>
                <SmallContainer>
                    <Heading>Happy Pet, Happy Life</Heading>
                    <Subheading>
                        Connecting pet owners and pet sitters, so there's no lonely days. 
                        Signed up and start making life happier. 

                    </Subheading> 
                    <BtnContainer>
                        <LoginBtn onClick={() => navigate('/login')}>Log in</LoginBtn>
                        <SignupBtn onClick={() => navigate('/signup')}>Sign up</SignupBtn>
                    </BtnContainer>
                    <HeroImg src='https://images.unsplash.com/photo-1551730459-92db2a308d6a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2487&q=80' alt="happy dog's hoding human hand" />
                    <SecondHeroImg src={heroCat}  alt='cat is sleeping in human arm'/>
                    <BallsImg src={balls}  />
                </SmallContainer>
            </BigContainer>
            <BigContainer2>
                <WalkingImg src="https://images.unsplash.com/photo-1582457380669-c833e7c77e01?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" />
                <SmallContainer2>
                    <FAQHeading>Frequently Asked Questions</FAQHeading>
                    <div class="accordionContainer">
                        <button onClick={onAccordionClick1} className={accordion1 ? "accordionButtonOpen" :"accordionButtonClosed"} >Question one?</button>
                        {accordion1 ? 
                        <div className="panel">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, 
                            sed do eiusmod tempor incididunt ut labore et dolore magna 
                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                            ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div> : <></>}
                        <button onClick={onAccordionClick2} className={accordion2 ? "accordionButtonOpen" :"accordionButtonClosed"}>Question two?</button>
                        {accordion2 ? 
                        <div className="panel">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, 
                            sed do eiusmod tempor incididunt ut labore et dolore magna 
                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                            ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div> : <></>}
                        <button onClick={onAccordionClick3} className={accordion3 ? "accordionButtonOpen" :"accordionButtonClosed"}>Question three?</button>
                        {accordion3 ? 
                        <div className="panel">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, 
                            sed do eiusmod tempor incididunt ut labore et dolore magna 
                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                            ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div> : <></>}
                    </div>
                </SmallContainer2>
                
            </BigContainer2>
            <Footer />
        </Main>
    )
}

export default MainPage

const Main = styled.main`
    width: 100%;
    min-width: 100vw;
    min-height: 100vh;
    position: relative;
    box-sizing: border-box;

`

const BigContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background: url("https://images.unsplash.com/photo-1551730459-92db2a308d6a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80") no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;


    @media (min-width: 768px) {
        background: #FFFFF6;

        &::after {
                    content:'';
                    position: absolute;
                    width: 30vw;
                    height: 100vh;
                    background-color: #FD9951;
                    right: 0;
        }
    }
`

const SmallContainer = styled.div`
    display:flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 350px;
    gap: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 2rem;    
    box-sizing: border-box;
    padding: 4rem;
    background:rgba(255,255,255, 0.9);
    position: relative;

  @media (min-width: 768px) {
   width: 700px;
   height: 80vh;
   background: transparent;
   box-shadow: none;
   align-items: flex-start;
   justify-content: flex-start;
   gap: 30px;
  }

  @media (min-width: 1025px) {
    width: 1000px;
    gap: 20px;
   }
`

const BigContainer2 = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex:1;
    width: 100%;
    min-height:100%;
    height: auto;
    min-height: 100vh;
    background: url("https://images.unsplash.com/photo-1551730459-92db2a308d6a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80") no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;


    @media (min-width: 768px) {
        background: #4C956C;

    }
`


const SmallContainer2 = styled.div`
    display:flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;
    height: 100%;
    width: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 2rem;    
    box-sizing: border-box;
    padding: 4rem;
    background: #4C956C;
    position: relative;
    opacity: 0.9;

  @media (min-width: 768px) {
   width: 50vw;
   height: auto;
   background: transparent;
   box-shadow: none;
   align-items: flex-start;
   justify-content: flex-start;
   gap: 30px;
  }

  @media (min-width: 1025px) {
    gap: 20px;
   }
`


const Heading = styled.h1`
    font-size: 6.4rem;
    font-family: 'Playfair Display', serif;
    width: 12ch;
    margin-bottom: 1rem;
    letter-spacing: 1px;
    line-height: 1.2;
    text-align:center;

    @media (min-width: 768px) {
        text-align:start;
       }

    

    
`
const Subheading = styled.p`
    font-family: 'Raleway', sans-serif;
    font-size: 1.8rem;
    width: 38ch;
    letter-spacing: 1px;
    line-height: 1.2;
    color: #555;
    text-align:center;

    @media (min-width: 768px) {
        text-align:start;
       }

`

const BtnContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;

    @media (min-width: 768px) {
        flex-direction: row;
       }
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

    &:hover{
        background-color: #4C956C;
        color: #FEFEE3;
        cursor:pointer;
    }
`
const SignupBtn = styled(Btn)`
    background-color: #FD9951;
    border: none;
    color: #FEFEE3;
    &:hover{
        background-color: transparent;
        border: solid 1.5px #FD9951;
        color: #FD9951;
        cursor:pointer;
    }
`

const HeroImg = styled.img`
    display:none;

    @media (min-width: 768px) {
        display:block;
        width: 45%;
        height: 80vh;
        border-radius: 18px;
        box-shadow: rgba(149, 157, 165, 0.3) 0px 8px 24px;
        z-index: 2;
        object-fit: cover;
        position: absolute;
        right:0;
        top:0
       }

`


const SecondHeroImg = styled.img`
    display:none;   
    @media (min-width: 768px) {
        display:block;
        position: absolute;
        width: 25%;
        bottom: -20px;
        right: 30%;
        z-index: 10;
    }

`

const BallsImg = styled.img`
    display:none;   
    @media (min-width: 768px) {
        display:block;
        position: absolute;
        width: 5%;
        bottom: 0;
        left:-20px;
        z-index: 10;
    }

`

const FAQHeading = styled.h1`
    font-family: 'Raleway', sans-serif;
    color: #FEFEE3;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    text-align: center;
    letter-spacing: 0.035em;
    width: 17ch;
    @media (min-width: 768px){
        width: 100%;
    }
 
`

const WalkingImg = styled.img`
    display:none;
     @media (min-width: 768px){
        display:block;
        width:50vw;
        height:100vh;
        object-fit:cover;

    }

   
`

    