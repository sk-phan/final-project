import React from 'react';
import styled from 'styled-components'
import logo from "../assets/white-logo.svg"
import { AiFillGithub } from 'react-icons/ai';
import { AiFillLinkedin } from 'react-icons/ai';
import { AiOutlineGlobal } from 'react-icons/ai'


export const Footer = () => {
    return(
        <FooterContainer>
            <Logo src={logo} alt='Pet app logp' />
            <SmallContainer>
                <LinkContainer>
                  <Link>
                    <AiFillGithub />
                    <a href='https://github.com/kolkri'>
                       Kristiina's Github
                    </a>
                  </Link>
                  <Link>
                    <AiFillLinkedin />
                    <a href='https://www.linkedin.com/in/kristiina-kolu-41631b1a4/'> 
                       Kristiina's Linkedin
                    </a>
                  </Link>
                  <Link>
                    <AiOutlineGlobal />
                    <a href='https://kristiina-kolu-portfolio.netlify.app'>
                        Kristiina's portfolio
                    </a>
                  </Link>
                </LinkContainer>
                <LinkContainer>
                <Link>
                    <AiFillGithub />
                    <a href='https://github.com/sukiphan97'>
                       Suki's Github
                    </a>
                  </Link>
                  <Link>
                    <AiFillLinkedin />
                    <a href='https://www.linkedin.com/in/nhung19/'> 
                        Suki's Linkedin
                    </a>
                  </Link>
                  <Link>
                    <AiOutlineGlobal />
                    <a href='https://sukinhungphan.netlify.app'>
                        Suki's portfolio
                    </a>
                  </Link>

                </LinkContainer>
            </SmallContainer>

        </FooterContainer>
    )
}

const FooterContainer = styled.div`
    width:100vw;
    height: 500px;
    padding-bottom: 2rem;
    background: #FD9951;
    color: #FEFEE3;
    display:flex;
    flex-direction: column;
    justify-content:space-between;
    align-items:center;

    @media (min-width: 768px) {
       flex-direction: row;
       height: 200px;
       overflowg: hidden;
       }
     
`
const SmallContainer = styled.div`
    display:flex;
    flex-direction: column;
    gap: 5rem;
    height: 100%;

    svg {
        color: #FEFEE3;
        width: 3rem;
        height: 3rem;

    }

    @media (min-width: 768px) {
        width: 700px;
        width: 3rem;
        height: 3rem;
        flex-direction: row;
        align-items: center;
        justify-content: center;

       }
     
       @media (min-width: 1025px) {
         width: 1000px;
        }
`

const LinkContainer = styled.div`
    display:flex;
    flex-direction: column;
    gap: 2rem;

    
`

const Link = styled.div`
    display: flex;
    align-items: center;
    gap: 1.6rem;

    a:link, a:visited {
        color: #FEFEE3;
        font-size: 1.8rem;
        text-decoration: none;
    }
    
    a:hover, a:active {
        color: #eee;
        text-decoration: underline;
    }
`


const Logo = styled.img`
   width: 25rem;
   height: 25rem;
   object-fit: cover;
`