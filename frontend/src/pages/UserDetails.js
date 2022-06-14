import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import styled from 'styled-components'
import moment from 'moment'



export const UserDetails = () => {
    const [review, setReview] = useState('')
	const { userId } = useParams()
    const navigate = useNavigate()
    const accessToken = useSelector((store) => store.user.accessToken);
    const otherUsersData = useSelector((store) => store.user.otherUsersData)

    
    const userToShow = otherUsersData.find(user => user._id === userId)


    return(
        <Main>
            <BackButton onClick={() => navigate(-1)}>Back</BackButton>
            <BigContainer>  
                <SmallContainer>      
                    <ImageContainer>
                        <Img src={userToShow.img}/>
                    </ImageContainer>
                    <TextContainer>
                        <ProfileTitle>@{userToShow.username}</ProfileTitle>
                        <ProfileText>
                            <ProfileTag>
                                <SpanBold>Profile type:</SpanBold> 
                                <SpanBold>Animal type:</SpanBold>  
                                <SpanBold>Location:</SpanBold>  
                                <SpanBold>Services:</SpanBold> 
                                <SpanBold>Dates:</SpanBold>  
                                <SpanBold>Description:</SpanBold> 
                            </ProfileTag>
                            <ProfileDetail>
                                <span>{userToShow.profileType}</span>
                                <span>{userToShow.animalType}</span>
                                <span>{userToShow.location}</span>
                                <span>{userToShow.preferableTime.map(time => {
                                return <span> {time}</span>})}
                                </span>
                                <span>{moment(userToShow.startDate).format('MMM Do YY')} - {moment(userToShow.endDate).format('MMM Do YY')}</span>
                                <span>{userToShow.description}</span>
                            </ProfileDetail>
                        </ProfileText>                         
                        <div>
                            <ReviewContainer>
                                <Reviews>
                                    <img src="https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" alt="reviewer image" />
                                    <div>
                                        <Name>@Alice</Name>
                                        <ReviewText>
                                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                        molestiae quas vel sint commodi repudiandae consequuntura" 
                                        </ReviewText>
                                    </div>
                                </Reviews>
                                <Reviews>
                                    <img src="https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" alt="reviewer image" />
                                    <div>
                                        <Name>@Alice</Name>
                                        <ReviewText>
                                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                        molestiae quas vel sint commodi repudiandae consequuntura" 
                                        </ReviewText>
                                    </div>
                                </Reviews>
                            </ReviewContainer>
                        <form>
                            <ReviewInput 
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                placeholder='write review here'     
                                rows='6'
                                cols='40'
                            />
                        </form>
                        </div>
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
  justify-content: center;
`

const SmallContainer = styled.div`
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
 const ImageContainer = styled.div`
      overflow:hidden;

   @media (min-width: 768px) {
    width: 600px;

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
   width: 200px;
   box-sizing: border-box;
   padding: 2rem;

   @media (min-width: 768px) {
    align-self: flex-start;
    gap: 2rem;
    width:400px;
   } 
 `

 const ProfileTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  margin:0;
  color: #000;


  @media (min-width: 768px) {
    font-size: 3.2rem;
  }
`

const ProfileText = styled.p`
  font-family: 'Raleway', sans-serif;
  font-weight: 500;
  font-size: 10px;
  margin:0;
  letter-spacing: 0.5px;

  @media (min-width: 768px) {
    font-size: 1.6rem;
    display: flex;
    flex-direction: row;
    gap: 4rem;
   }
`

const ProfileTag = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
`

const ProfileDetail = styled(ProfileTag)`
   span {
       color: #333;
   }
`

const SpanBold = styled.span`
   font-weight: 700;
`

const ReviewContainer = styled.div`
    margin-top: 10rem;
    border-top: solid 0.5px #000;

`

const Reviews = styled.div`
  width: 34rem;
  height: 18rem;
  padding: 2rem;
  box-sizing: border-box;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  overflow: scroll;

  img {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
  }

  p {
    margin: 0 0 1rem 0;
    font-size: 1.6rem;
  }
`

const ReviewHeading = styled.h2 `
  font-size: 2.4rem;
  align-self: flex-start;
  margin: 0 0 4rem 4rem;
`

const ReviewText = styled.p`
    color: #333;
`

const Name = styled.p`
  font-size: 2.4rem;
  font-weight: 700;
  margin: 2rem 0 1rem 0;
`
const ReviewInput = styled.textarea`

`