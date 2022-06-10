import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import styled from 'styled-components'
import moment from 'moment'



export const UserDetails = () => {
	const { userId } = useParams()
    const navigate = useNavigate()
    const accessToken = useSelector((store) => store.user.accessToken);
    const otherUsersData = useSelector((store) => store.user.otherUsersData)

    
    const userToShow = otherUsersData.find(user => user._id === userId)

    console.log(userToShow)


    const onBackButtonClick = () => {
        navigate(-1)
    }



    return(
        <Main>
            <BackButton onClick={onBackButtonClick}>Back</BackButton>
            <BigContainer>
            
                <SmallContainer>
                   
                    <ImageContainer>
                        <Img src={userToShow.img}/>
                    </ImageContainer>
                    <TextContainer>
                        <ProfileTitle>@{userToShow.username}</ProfileTitle>
                        <ProfileText><SpanBold>Profile type:</SpanBold> {userToShow.profileType}</ProfileText>
                        <ProfileText><SpanBold>Animal type:</SpanBold>  {userToShow.animalType}</ProfileText>
                        <ProfileText><SpanBold>Location:</SpanBold>  {userToShow.location}</ProfileText>
                        <ProfileText><SpanBold>Services:</SpanBold> 
                            {userToShow.preferableTime.map(time => {
                            return <span> {time}</span>})}
                        </ProfileText>
                        <ProfileText><SpanBold>Dates:</SpanBold>  {moment(userToShow.startDate).format('MMM Do YY')} - {moment(userToShow.endDate).format('MMM Do YY')}</ProfileText>
                        <ProfileText><SpanBold>Description:</SpanBold> {userToShow.description}</ProfileText>


                    </TextContainer>

                </SmallContainer>
            </BigContainer>
        </Main>
    )

}

const BackButton = styled.button`
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
 const Main = styled.main`
    width: 100%;
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
 `
 const BigContainer = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
 

 
  
`

const SmallContainer = styled.div`
  display:flex;
  flex-direction: column;
  align-items:center;
  width: 320px;
  gap: 20px;
  padding:10px;
  
  @media (min-width: 768px) {
   width: 700px;
   flex-direction: row;
   justify-content:center;
   
  }

  @media (min-width: 1025px) {
    width: 1000px;
   }
`
 const ImageContainer = styled.div`
   width:200px;
   height: 200px;
   border-radius: 20px;
   box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.04);
   overflow:hidden;

   @media (min-width: 768px) {
    width:300px;
    height: 300px;
   }
 `

 const Img = styled.img`
    width:100%;
    height:100%;
    object-fit: cover;
 `

 const TextContainer = styled.div`
   display:flex;
   flex-direction: column;
   gap: 10px;
   width: 200px;
   @media (min-width: 768px) {
    align-self: flex-start;
    gap: 15px;
    width:400px
   }
   

   

 
 `

 const ProfileTitle = styled.h1`
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 12px;
  margin:0;
  color: #000;
  @media (min-width: 768px) {
    font-size: 18px;
   }
`

const ProfileText = styled.p`
  font-family: 'Raleway', sans-serif;
  font-weight: 500;
  font-size: 10px;
  margin:0;
  @media (min-width: 768px) {
    font-size: 14px;
   }
`

const SpanBold = styled.span`
   font-weight: 700;
`