import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { user } from "../reducers/user";
import { useNavigate } from "react-router-dom";

import { Loader } from "../components/Loader";

import { API_URL } from "../utils/url";
import { Main, BackBtn, 
        Container, SmallContainer,
        FormContainer, FormWrapper,
        Header, Heading, Form,
        ProfileImg, InputContainer,
        Label, Checkbox, P, RadioLabel,
        RadioInput, ProfileContainer, SubmitBtn,
        EditBtn, ReviewList, Name, Reviews, ReviewHeading, ReviewText,
        EmptyReview
       } from "../styling/ProfileStyling";

export const Profile = () => {
  
    const userProfile = useSelector(state => state.user.userData)

    const accessToken = useSelector((store) => store.user.accessToken);

    const [updatedData, setUpdatedData] = useState(null);
    const [username, setUsername ]= useState('');
    const [email, setEmail ]= useState('');
    const [animalType, setAnimalType] = useState('')
    const [preferableTime, setPreferableTime] = useState([])
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [img, setImg] = useState('')
    const [editImg, setEditImg] = useState(false)

    const [reviews, setReviews] = useState([]);

    const dispatch = useDispatch();

    const [loader, setLoader] = useState(false)

    const navigate = useNavigate();

    const preferTimeOption = ['2-3 hours', ' > 5 hours', 'overnights', 'weekends', 'longer periods'];

    const onSubmit =  (e) => {
        e.preventDefault();
        const options = {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                  userId: userProfile._id,  
                  preferableTime: preferableTime,   
                  endDate: endDate,
                  startDate: startDate,
                  animalType: animalType,
                  email: email,
                  username: username, 
                  img: img
                }),
              };
      fetch (API_URL('edituser'), options)
      .then ((res) => res.json())
      .then ((data) => {
        if (data.success) {
          dispatch(user.actions.setError(''))
        } else {
          dispatch(user.actions.setError('Update failed'))
        }
      })
      .catch(error => console.log(error))
    }

    
    useEffect(() => {
      fetch(API_URL('reviews'))
      .then(res => res.json())
      .then(data => {
        if(data.success) {     
          const filterReviews = data.response.filter(item => item.revieweeId === userProfile._id)
          setReviews(filterReviews)
          dispatch(user.actions.setError(''))
        } else {
          dispatch(user.actions.setError('Fail to load reviews'))
        }
      })
      .catch(error => console.log(error))
    }, [])
    


    useEffect(() => {

      setLoader(true)
      const options = {
        method: 'GET',
        headers: {
            'Authorization': accessToken
        },
    }
      fetch(API_URL('users'), options)
      .then((res) => res.json())
      .then((data) => {
        const userNew = data.find(item => item._id === userProfile._id)  
        setUpdatedData(userNew)
        setUsername(userNew.username)
        setImg(userNew.img)
        setEmail(userNew.email)
        setStartDate(userNew.startDate)
        setEndDate(userNew.endDate)
        setAnimalType(userNew.animalType)
        setPreferableTime(userNew.preferableTime)   

        if (user) {
          dispatch(user.actions.setUserData(userNew))
        }
      })
      .catch(error => console.log(error))
      .finally(() => setLoader(false))
  
    }, [])

  

  
    //Time checkbox
    const onTimeCheckbox = (time) => {
        if (preferableTime.includes(time)) {
          const timeArray = preferableTime.filter(item => item !== time );
          setPreferableTime(timeArray)
        }     
        else setPreferableTime([...preferableTime, time])
      }

    return (
    <Main>
      <BackBtn type='button' onClick={() => navigate(-1)}> 	&#60; Back</BackBtn>
      {loader && <Loader />}
      {!loader && 
      
      <Container>
        <SmallContainer>
          {updatedData && 
          <>
          <FormContainer>
            <FormWrapper>
            <Form onSubmit={onSubmit}>
              <Header>
                <ProfileImg src={img}/>
                {!editImg && <EditBtn onClick={() => setEditImg(!editImg)}>Upload new picture</EditBtn> }
                {editImg && <input  className = "imageInput"
                    type='text'
                    name="myImage"
                    value={img}
                    onChange={(e) => setImg(e.target.value)}
                    placeholder='Place an image link address'
                />  }
              </Header>
                <Label htmlFor="username">
                    Username
                    <input 
                        id='username'
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}                  
                    />
                </Label>
                <Label htmlFor="email">
                    Email
                    <input 
                        id='email'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}                  
                    />
                </Label>
          
                <Heading>Pet information</Heading>
                <ProfileContainer>
              
                <InputContainer>
                  <P>Animal type:</P>
                  <RadioLabel htmlFor='dog'>
                      <RadioInput
                        id='dog'
                        type = 'radio' 
                        value = 'dog' 
                        checked = {animalType === 'dog'}
                        onChange = {(e) => setAnimalType(e.target.value)}
                      />
                      Dog
                  </RadioLabel>
                  <RadioLabel htmlFor='cat'>
                  <RadioInput
                      id='cat'
                      type = 'radio' 
                      value = 'cat' 
                      checked = {animalType === 'cat'}
                      onChange = {(e) => setAnimalType(e.target.value)}
                  />
                      Cat
                  </RadioLabel>
                </InputContainer>
            </ProfileContainer>
            <Checkbox>
                <P>Duration of pet sitting:*</P>
                {preferTimeOption.map(item => {
                    return <RadioLabel key={item} htmlFor={item}>
                            <RadioInput
                            id={item}
                            type='checkbox'
                            value = {item}
                            checked = {preferableTime.includes(item)}
                            onChange = { () => onTimeCheckbox(item) }      
                            />
                            {item}
                            </RadioLabel>
                })}
            </Checkbox>
            <Label htmlFor='start-date'>
                Start Date:*
              <input
                id="start-date"
                className="input"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />            
            </Label>
            <Label htmlFor="end-date">
                End Date:*
              <input
                id="end-date"
                className="input"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />           
            </Label>         
            <SubmitBtn type="submit">Save profile</SubmitBtn>
            </Form>
            </FormWrapper>
          </FormContainer>
          <ReviewHeading>Your reviews</ReviewHeading>
            <ReviewList>
              {reviews.length > 0 && reviews.map(item => {
                return <Reviews key={item._id}>
                <img src={item.img} alt={item.username + 'image'} />
                <div>
                  <Name>@{item.username}</Name>
                  <ReviewText>
                    {item.reviewText}
                  </ReviewText>
                </div>
              </Reviews>
              })}
              {reviews.length === 0 && <EmptyReview>You have no review</EmptyReview>}
            </ReviewList>
          </>}
        </SmallContainer>
        
      </Container>}
    </Main>

    )

}

