import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import styled from 'styled-components'
import moment from 'moment'
import { AiOutlineEdit } from 'react-icons/ai'
import { MdOutlineFileDownloadDone } from 'react-icons/md'
import { RiDeleteBin2Line } from 'react-icons/ri'
import { Loader } from "../components/Loader";
import { API_URL } from '../utils/url';

import { BackButton,  Main, BigContainer, SmallContainer, ImageContainer,
         Img, TextContainer, ProfileTitle, ProfileText, ProfileTag, 
         ProfileDetail, SpanBold, ReviewContainer, Reviews, ReviewText, 
         Name, Form, SubmitBtn, ReviewInput, ReviewHead, Buttons, 
         EditBtn, SendEmail } from '../styling/UserDetailStyle';

export const UserDetails = () => {
    const existingReviews = useSelector(store => store.user.reviews);

    const [review, setReview] = useState('');
    const [reviewList, setReviewList] = useState(existingReviews);
	const { userId } = useParams()
    const navigate = useNavigate()
    const accessToken = useSelector((store) => store.user.accessToken);
    const mainUserId = useSelector((store) => store.user.userData)
    
    const [edit, setEdit] = useState(false)
    const [editText, setEditText] = useState('')
    const [editId, setEditId] = useState('')
    const [loading, setLoading] = useState(false)

    // const userToShow = otherUsersData.find(user => user._id === userId)
    const [userToShow, setUserToShow] = useState([])


    const onFormSubmit = (e) => {
        e.preventDefault();
        
        const options = {
            method: "POST",
            headers: {
                        "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                    reviewerId: mainUserId._id, 
                    revieweeId: userId, 
                    username: mainUserId.username,
                    img: mainUserId.img,
                    reviewText: review
                    }),
        }

        fetch(API_URL('reviews'), options) 
        .then(res => res.json())
        .then(data => setReviewList((prev) => [...prev, data.response]))
        .catch(error => console.log(error))
        .finally(() => setReview(''))
    }    
    useEffect(() => {
        fetch(API_URL('reviews')) 
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                const filterReviews = data.response.filter(item => item.revieweeId === userId)
                setReviewList(filterReviews)        
            }
        })
    }, [])

    const onEditClick = async (message, _id, reviewId) => {
        
        setEditId(reviewId)
        const findId = await reviewList.map(item => {
            if (item._id === reviewId && item.reviewerId === mainUserId._id) {
                setEdit(!edit)
                return {...item, reviewText: editText}
            } else {
                return item
            }
        })        
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                reviewId: reviewId, 
                reviewText: editText
            }),
          };

        fetch(API_URL('editReview'), options)
        .then((res) => res.json())
        .then((data) => console.log(data))
        .finally(() => setEditText(''))

        return setReviewList(findId)
        }     
    
    const onDeleteReview = async (id, username) => {

        if (username === mainUserId.username) {
            
                    const updateReviews = await reviewList.filter(item => item._id !== id);
            
                    const options = {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ 
                            reviewId: id, 
                        }),
                    }
            
                    await fetch(API_URL('deleteReview'), options)
            
                    return setReviewList(updateReviews)
        }
    }

    useEffect(() => {
        const options = {
          method: 'GET',
          headers: {
              'Authorization': accessToken
          },
      }
        setLoading(true) 
        fetch(API_URL('users'), options)
        .then((res) => res.json())
        .then((data) => {
          const userNew = data.find(item => item._id === userId)  
          setUserToShow(userNew)
        })
        .finally(() => setLoading(false))
    
      }, [])


    return(
        <Main>
            {loading && <Loader />}
            {!loading && 
            <>
            <BackButton onClick={() => navigate(-1)}>Back</BackButton>
            {userToShow.length !== 0 && 
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
                                return <span key={time}> {time}</span>})}
                                </span>
                                <span>{moment(userToShow.startDate).format('MMM Do YY')} - {moment(userToShow.endDate).format('MMM Do YY')}</span>
                                <span>{userToShow.description}</span>
                            </ProfileDetail>
                        </ProfileText> 
                        <SendEmail href={`mailto:${userToShow.email}`}>Contact {userToShow.username}</SendEmail>     
                        <Form onSubmit={onFormSubmit}>
                            <ReviewInput
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                placeholder='write review here 🐶' 
                                width = {review}
                            ></ReviewInput>
                            <SubmitBtn type='submit' display = {review}>Add</SubmitBtn>
                        </Form>        
                            <ReviewContainer>
                                    {reviewList.length > 0 && reviewList.map(item => (
                                        <Reviews>
                                            <img src={item.img} alt="reviewer" />
                                            <div>
                                                <ReviewHead>
                                                    <Name>@{item.username}</Name>
                                                    <Buttons>
                                                        <EditBtn 
                                                            display={item.reviewerId === mainUserId._id ? 'inline-block' : 'none'} 
                                                            type='button' onClick={() => onEditClick(item.reviewText, item.reviewerId, item._id)}>
                                                                {!edit ? <AiOutlineEdit /> : <MdOutlineFileDownloadDone />}
                                                        </EditBtn>
                                                        <EditBtn display={item.reviewerId === mainUserId._id ? 'inline-block' : 'none'}  onClick={() => onDeleteReview(item._id, item.username)}><RiDeleteBin2Line/></EditBtn>
                                                    </Buttons>
                                                </ReviewHead>
                                                {item._id === editId && edit && <ReviewInput 
                                                                type='text'
                                                                onChange={(e) => setEditText(e.target.value)}
                                                                value={editText}
                                                            />}
                                                <ReviewText display={item._id === editId && edit ? 'none' : 'block'}>
                                                "{item.reviewText}" 
                                                </ReviewText>
                                            </div>
                                        </Reviews>
                                    ))}
                            </ReviewContainer>
                    </TextContainer>
                </SmallContainer>
            </BigContainer>}
            </>}
        </Main>
    )

}

