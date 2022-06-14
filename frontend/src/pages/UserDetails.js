import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components'
import moment from 'moment'

import { user } from '../reducers/user';


export const UserDetails = () => {
    const existingReviews = useSelector(store => store.user.reviews);

    const [review, setReview] = useState('');
    const [reviewList, setReviewList] = useState(existingReviews);
	const { userId } = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const accessToken = useSelector((store) => store.user.accessToken);
    const otherUsersData = useSelector((store) => store.user.otherUsersData)
    const mainUserId = useSelector((store) => store.user.userData)
    
    const userToShow = otherUsersData.find(user => user._id === userId)
    const reviewToShow = reviewList.find(review => review.revieweeId ===userId)

    console.log(reviewToShow)
    const onFormSubmit = (e) => {
        e.preventDefault();
        
        const options = {
            method: "POST",
            headers: {
                        "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                    reviewerId: mainUserId.userId, 
                    revieweeId: userId, 
                    username: mainUserId.username,
                    img: mainUserId.img,
                    reviewText: review
                    }),
          }

        fetch('http://localhost:8080/reviews', options) 
        .then(res => res.json())
        .then(data => setReviewList((prev) => [...prev, data.response]))

    }
    
    
    useEffect(() => {
        fetch(`http://localhost:8080/reviews/${userId}`) 
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                dispatch(user.actions.setReviews(data.response))
            }
        })
    }, [])
    
    
    console.log(review)

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
                                    {reviewList.length > 0 && reviewToShow && reviewList.map(item => (
                                        <Reviews>
                                            <img src={item.img} alt="reviewer image" />
                                            <div>
                                                <Name>@{item.username}</Name>
                                                <ReviewText>
                                                "{item.reviewText}" 
                                                </ReviewText>
                                            </div>
                                        </Reviews>
                                    ))}
                            </ReviewContainer>
                        <Form onSubmit={onFormSubmit}>
                            <ReviewInput
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                placeholder='write review here 🐶' 
                                width = {review}
                            ></ReviewInput>
                            <SubmitBtn type='submit' display = {review}>Add</SubmitBtn>
                        </Form>
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
    height: 300px;
    border-top: solid 0.5px #000;
    overflow: scroll;

`

const Reviews = styled.div`
  width: 34rem;
  height: 14rem;
  padding: 4rem 2rem;
  box-sizing: border-box;
  border-bottom: solid 0.5px #D1D0D0;
  display: flex;
  flex-direction: row;
  gap: 2rem;

  img {
    width: 6rem;
    height: 6rem;
    object-fit: cover;
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

const Form = styled.form`
    display: flex;
    margin-top: 4rem;
`

const SubmitBtn = styled.button`
    background-color: #000;
    color: #fff;
    border: none;
    padding: 1rem;
    display: ${props => props.display === '' ? 'none' : 'inline'};
    width: 12rem;
    height: 4rem;
    transition: all 1s ease;

`

const ReviewInput = styled.textarea`
    border: transparent;
    border-bottom: solid 0.5px #000;
    outline: none;
    width: ${props => props.width === '' ? '100%' : '70%'};
    font-size: 1.4rem;
    transition: all 1s ease;

    &:hover {
    }
`