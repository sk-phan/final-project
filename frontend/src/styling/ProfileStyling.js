import styled from "styled-components"

export const Main = styled.main`
    width: 100%;
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative; 
`

export const BackBtn = styled.button`
  position: absolute;
  top: 3rem;
  left: 0;
  border: none;
  cursor: pointer;
  color: #000;
  text-decoration: underline;
  background-color: transparent;
  padding: 1.5rem;
  width: 12rem;
  font-weight: 600;
  font-size: 1.8rem;
  transition: all 0.4s ease;
  z-index: 10;


    &:link, &:visited {
      color: #000;
    }
    &:hover, &:active {
      left: -10px;
      color: #FD9951;
    }

`


export const Container = styled.div`
  height: 100vh;
  box-sizing: border-box;
  
  `

export const SmallContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`

export const FormContainer = styled.div`
  width: 100%;
  height: auto;
  min-height:100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  background: #fafafa;
  padding:60px 0 0 60px;
  



@media (max-width: 785px) {
  min-height: 100vh;
  overflow: none;
  padding:30px 0 0 30px;

}

`

export const FormWrapper = styled.div`
  width: 700px;
  box-sizing: border-box;

  @media (max-width: 785px) {
    width: 300px;
    padding-top: 10rem;
    

  }
`

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  padding-bottom: 4rem;
`

export const Heading = styled.h2`
  font-size: 2.4rem;
  margin: 3 0 1rem 0;
`
export const Form = styled.form`
  display: flex;
  flex-direction: column; 
`

export const ProfileImg = styled.img`
  width: 10rem;
  height: 10rem;
  object-fit: cover;
  border-radius: 50%;
`

export const InputContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 5rem;
`

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 3.2rem;
  gap: 1.2rem;
  font-size: 1.6rem;
  width: 100%;

  input {
    align-self: flex-start;
    width: 45rem;

   @media (max-width: 785px) {
    width: 35rem;
   }    
  }
  
`

export const Checkbox = styled.div`
  margin-bottom: 3.2rem;

`

export const P = styled.p`
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 1.6rem;
`
export const RadioLabel = styled.label`
  display:flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.6rem; 
`

export const RadioInput = styled.input`
  width: fit-content;
  color:#FD9951;
`


export const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`
export const SubmitBtn = styled.button`
    border: none;
    width: 15rem;
    height: 5rem;
    background-color: #FD9951;
    border-radius: 1rem;
    cursor: pointer;
    color: #fff;
    padding: 1.2rem;
    font-weight: 600;
    font-size: 1.6rem;
    margin-bottom: 4rem;

    &:disabled {
      background-color: #fdc7a0;
    }

    &:hover {
      background-color: #ec8941;
    }

`

export const EditBtn = styled(SubmitBtn)`
   width: 18rem;
   margin-bottom: 0;
`

export const Side = styled.div`
  width: 60rem;
  min-width: 20rem;
  height: 100vh;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6rem 4rem 4rem 4rem;
  box-sizing: border-box;
  background-color: #ffff;
  overflow: scroll;

  @media (max-width:785px) {
    display: none;
  }

`

export const ReviewList = styled.div`
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      overflow: scroll;
      margin-top:2rem;
`
export const Name = styled.p`
  font-size: 2.4rem;
  font-weight: 700;
  margin: 2rem 0 1rem 0;
`

export const Reviews = styled.div`
  height: 15rem;
  padding-left: 60px;
  box-sizing: border-box;
  border-bottom: solid 1px #eee;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  padding:0 0 0 60px;
      @media (max-width: 785px) {
        padding:0 0 0 30px;
      
      }

  div {
    width: 20rem;
    min-width: 15rem;
  }
  
  img {
    width: 10rem;
    height: 10rem;
    object-fit: cover;
    border-radius: 1rem;
  }
  
  p {
    overflow-wrap: break-word;
    margin: 0 0 1rem 0;
    font-size: 1.6rem;
    min-width: 10rem;
  }
  `


export const ReviewHeading = styled.h2 `
  font-size: 2.4rem;
  align-self: flex-start;
  margin: 2rem 0 0 60px;
  @media (max-width: 785px) {
    padding:0 0 0 30px;
  
  }
`

export const ReviewText = styled.p`
    color: #333;
`

export const EmptyReview = styled.p`
   margin: 2rem;
   font-size: 1.8rem;
   color: #999;
   font-style: italic;
`
