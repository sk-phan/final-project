import styled from "styled-components"
import { Link } from "react-router-dom"

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
`

export const SmallContainer = styled.div`
  display:flex;
  flex-wrap: wrap;
  width: 320px;
  gap: 20px;
  padding:10px;

  @media (min-width: 768px) {
   width: 700px;
   gap:50px;
  }

  @media (min-width: 1025px) {
    width: 1000px;
    gap:40px;
   }
`

export const UserContainer = styled(Link)`
  position: relative;
  display:flex;
  flex-direction: column;
  overflow:hidden;
  width: 150px;
  height: 250px;
  background-color: #fff;
  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.04);
  border-radius:10px;
  text-decoration: none;

   @media (min-width: 768px) {
    width: 200px;
    height: 300px;
   }
 
   @media (min-width: 1025px) {
     width: 220px;
     height: 350px;
    }
`

export const ProfileImageContainer = styled.div`
    width: 100%;
    height: 50%;
    background-color: red;
    box-sizing: border-box;

`

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-sizing: border-box;
`
export const ProfileTextContainer = styled.div`
    width: 100%;
    height: 50%;
    padding:5px;
    gap: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    box-sizing: border-box;

    @media (min-width: 1025px) {
      padding:10px;
      gap: 10px;
     }
    
`
export const ProfileTitle = styled.h1`
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 12px;
  margin:0;
  color: #000;
  @media (min-width: 768px) {
    font-size: 18px;
   }
   display:flex;
   width: 100%;
   justify-content: space-between;
`

export const ProfileText = styled.p`
  font-family: 'Raleway', sans-serif;
  color: #666666;
  font-weight: 500;
  font-size: 10px;
  margin:0;
  @media (min-width: 768px) {
    font-size: 14px;
   }
`

export const LocationText = styled.p`
font-family: 'Raleway', sans-serif;
  color: #000;
  font-weight: 900;
  font-size: 9px;
  margin:0;
  @media (min-width: 768px) {
    font-size: 11px;
   }

`
export const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    
`
export const Tag = styled.span`
  
  background-color: #e5f2eb;
  padding: 3px;
  color: #000;
  width: fit-content;
  font-weight: 500;
  border-radius:5px;
  font-size: 8px;
  text-transform: uppercase;
  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.04);
  @media (min-width: 768px) {
    font-size: 10px;
    border-radius:7px;
    padding: 5px;
   }
`

export const Overlay = styled.div`
  position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background: #111111;
	opacity: 0;

  &:hover{
    opacity: 0.1;
  }

`

export const FilterContainer = styled.div`
    background: red;
    display: ${props => props.display};
    flex-wrap: wrap;
    width: 320px;
    gap: 20px;
    padding:10px;
    background-color: #fff;
    box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.04);
    border-radius:10px;
`

export const FilterButton = styled.button`
  display: flex;
  align-items: center;
  align-self: flex-end;
  width: fit-content;
  gap: 1rem;
  background-color: transparent;
  border: solid 1.5px #000;
  color: #000;
  border-radius: 10px;
  padding:7px;
  margin: 0 10px;

  &:hover{
    background-color: #4C956C;
    border: solid 1.5px #4C956C;
    cursor: pointer;
    color: #fff;
  }
  
`
export const FilterForm = styled.form`
`

export const FilterText = styled.p`
font-family: 'Raleway', sans-serif;
padding:0;
margin:0;
font-weight: 700;
font-size: 12px;

`

export const FilterTitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content:space between;
`

export const ExitButton = styled.button`
    display:flex;
    justify-content: center;
    align-items:center;
    border-radius: 50%;
    border: black solid;
    width: 3rem;
    height: 3rem;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background-color: #F5F5F5;
    font-weight: 600;
    cursor:pointer;
      background-color: #F5F5F5;
    &:hover{
      background-color: #FD9951;
      cursor: pointer;
    }
`

export const RadioLabel = styled.label`
  display:flex;
  align-items: center;
  font-size: 14px;
`

export const RadioInput = styled.input`
  width: fit-content;
  color:#FD9951;
`


