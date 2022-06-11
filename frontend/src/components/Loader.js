import React from 'react';
import styled, { keyframes } from 'styled-components'

export const Loader = () => {
    return(
        <LoaderDiv></LoaderDiv>
    )
}

const spin = keyframes`
  from {
    transform: rotate(0deg); 
  }

  to {
    transform: rotate(360deg);
  }
`;

const LoaderDiv = styled.div`
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid #FD9951;
    border-right: 16px solid #4C956C;
    border-bottom: 16px solid #FD9951;
    border-left: 16px solid #4C956C;
    width: 120px;
    height: 120px;
    animation: ${spin} 2s linear infinite;
`



