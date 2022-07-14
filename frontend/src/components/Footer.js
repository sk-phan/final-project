import React from 'react';
import logo from "../assets/white-logo.svg"
import { AiFillGithub } from 'react-icons/ai';
import { AiFillLinkedin } from 'react-icons/ai';
import { AiOutlineGlobal } from 'react-icons/ai'

import { FooterContainer, Logo, SmallContainer, Link, LinkContainer } from '../styling/FooterStyle';


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

