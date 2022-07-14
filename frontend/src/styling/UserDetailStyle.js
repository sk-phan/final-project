import styled from "styled-components";

export const BackButton = styled.button`
    position:absolute;
    top:20px;
    left:20px;
    border: #FD9951;
    background-color: #FD9951;
    border-radius: 1rem;
    cursor: pointer;
    color: #fff;
    padding: 1.5rem;
    margin: 24px 12px 12px 12px;
    font-weight: 600;
    font-size: 1.6rem;

    &:hover{
        border: solid 1.5px #FD9951;
        color: #FD9951;
        background: transparent;
    }

`
export const Main = styled.main`
    width: 100%;
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
 `
export const BigContainer = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const SmallContainer = styled.div`
  display:flex;
  flex-direction: column;
  align-items:center;
  gap: 20px;
  padding:10px;
  
  @media (min-width: 768px) {
 
   flex-direction: row;
   justify-content:center;
   
  }

  @media (min-width: 1025px) {
    width: 1000px;
   }
`
export const ImageContainer = styled.div`
      overflow:hidden;
      width: 300px;
      

   @media (min-width: 768px) {
    width: 350px;
    align-self:flex-start;
    padding-top:20px;

   }
 `

export const Img = styled.img`
    width:100%;
    height:100%;
    object-fit: cover;
    box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.04);
    border-radius:10px;
 `

export const TextContainer = styled.div`
   display:flex;
   flex-direction: column;
   width: 320px;
   height:100vh;
   box-sizing: border-box;
   padding: 2rem;
   gap: 2rem;

   @media (min-width: 768px) {
    align-self: flex-start;
    width:400px;
   } 
 `

export const ProfileTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  margin:0;
  color: #000;
  font-size: 3.2rem;

`

export const ProfileText = styled.div`
  font-family: 'Raleway', sans-serif;
  font-weight: 500;
  margin:0;
  letter-spacing: 0.5px;
  font-size: 16px;
  flex-direction: row;
  display: flex;
  gap:2rem;

  @media (min-width: 768px) {
    gap: 4rem;
   }
`

export const ProfileTag = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    width: fit-content;
`

export const ProfileDetail = styled(ProfileTag)`
   span {
       color: #333;
   }
`

export const SpanBold = styled.span`
   font-weight: 700;
`

export const ReviewContainer = styled.div`
    overflow-y: scroll;
`

export const Reviews = styled.div`
  width: 100%;
  height: 14rem;
  padding: 4rem 2rem;
  box-sizing: border-box;
  border-bottom: solid 0.5px #D1D0D0;
  display: flex;
  flex-direction: row;
  gap: 2rem;

  div {
      width: 20rem;
  }

  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 50%;
  }

  p {
    margin: 0 0 1rem 0;
    font-size: 1.6rem;
  }
`
 

export const ReviewText = styled.p`
    color: #333;
    display: ${props => props.display};
`

export const Name = styled.p`
  font-size: 2.4rem;
  font-weight: 700;
  margin: 2rem 0 1rem 0;
`

export const Form = styled.form`
    display: flex;
    margin-top: 4rem;
`

export const SubmitBtn = styled.button`
    background-color: #000;
    color: #fff;
    border: none;
    padding: 1rem;
    display: ${props => props.display === '' ? 'none' : 'inline'};
    width: 12rem;
    height: 4rem;
    cursor: pointer;
    transition: all 1s ease;

`

export const ReviewInput = styled.textarea`
    border: transparent;
    border-bottom: solid 0.5px #000;
    outline: none;
    width: ${props => props.width === '' ? '100%' : '70%'};
    font-size: 1.4rem;
    transition: all 1s ease;

    &:hover {
    }
`
export const ReviewHead = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8rem;
    
    `

export const Buttons = styled.div`
    display: inline;
    `

export const EditBtn = styled.button`
    display: ${props => props.display};
    background: transparent;
    border: none;
    font-size: 2rem;
    cursor: pointer;

    &:hover {
        font-size: 2.2rem;
        color: #ec8941;
    }

`

export const SendEmail = styled.a`
    font-size: 1.8rem;
    font-weight: 700;
    width: fit-content;
    border-radius: 10px;
    padding: 10px;
    background-color: transparent;
    border: solid 1.5px #4C956C;
    color: #4C956C;
    display: flex;
    justify-content:center;
    align-items: center;
    text-decoration:none;

    &:hover{
        background-color: #4C956C;
        color: #FEFEE3;
        cursor:pointer;
    }

`