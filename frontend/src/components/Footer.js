import React from 'react';
import styled from 'styled-components'

export const Footer = () => {
    return(
        <FooterContainer>
            <SmallContainer>
                <FooterText>KRIS AND SUKI</FooterText>
                <FooterText>Pet Sitter App</FooterText>
            </SmallContainer>

        </FooterContainer>
    )
}

const FooterContainer = styled.div`
    width:100vw;
    height: 200px;
    background: #FD9951;
    color: #FEFEE3;
    display:flex;
    justify-content:center;
    align-items:center;
`
const SmallContainer = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    width: 350px;
    gap: 20px;
    height: 100%;

    @media (min-width: 768px) {
        width: 700px;
       }
     
       @media (min-width: 1025px) {
         width: 1000px;
        }
`

const FooterText = styled.p`
    color: #FEFEE3; 
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    letter-spacing: 0.035em;
    padding:0;
    margin:0;
`