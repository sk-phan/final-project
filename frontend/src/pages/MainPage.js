import React, {useState} from "react";
import heroCat from '../asset/catHero.png'
import balls from '../assets/decoration_balls.svg'
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import logo from "../assets/logo1.svg"

import { Main, Logo, BigContainer, SmallContainer,
Heading, Subheading, BtnContainer, LogoBtn, SignupBtn, LoginBtn, HeroImg, SecondHeroImg,
BallsImg, BigContainer2, WalkingImg, SmallContainer2, FAQHeading } from "../styling/MainPageStyle";


const MainPage = () => {

    const navigate = useNavigate();
    const [accordion1, setAccordion1] = useState(false)
    const [accordion2, setAccordion2] = useState(false)
    const [accordion3, setAccordion3] = useState(false)

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

    return(
        <Main>
            <Logo src={logo} />
            <BigContainer>
                <SmallContainer>
                    <Heading>Happy Pet, Happy Life</Heading>
                    <Subheading>
                        Connecting pet owners and pet sitters, so there are no more lonely days. 
                        Join our community and make life happier.  
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
                    <div className="accordionContainer">
                        <button onClick={onAccordionClick1} className={accordion1 ? "accordionButtonOpen" :"accordionButtonClosed"} >What is this project about?</button>
                        {accordion1 ? 
                        <div className="panel">
                            This is a final project of Technigo's boot camp spring '22 made by Suki and Kristiina. We wanted to create a realistic 
                            app that combines many aspects that we learnt during the boot camp. We are both animal lovers 
                            and that's how this app idea slowly came alive.
                                
                            
                        </div> : <></>}
                        <button onClick={onAccordionClick2} className={accordion2 ? "accordionButtonOpen" :"accordionButtonClosed"}>How does the app work?</button>
                        {accordion2 ? 
                        <div className="panel">
                            To be able to see the content of our app, we ask you kindly to sign up. Remember to fill in all the required inputs.
                            You can pretend to be either a pet owner or a pet sitter. As a profile image we ask to provide a link to the image. 
                            You can search nice animal/profile pictures from unsplash/pexel or if you want to use your own photo but you don't have a 
                            photo of yourself available online, you can upload in and host it using for example https://imgbb.com/. 
                            
                        </div> : <></>}
                        <button onClick={onAccordionClick3} className={accordion3 ? "accordionButtonOpen" :"accordionButtonClosed"}>Which technologies did we use?</button>
                        {accordion3 ? 
                        <div className="panel">
                            The front-end part was built by using HTML, CSS, React, Style Components and the back-end was built by Node.js, Express.js and Mongo DB
                        </div> : <></>}
                    </div>
                </SmallContainer2>
                
            </BigContainer2>
            <Footer />
        </Main>
    )
}

export default MainPage

