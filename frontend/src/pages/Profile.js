import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { user } from "../reducers/user";

import { NavBar } from "../components/NavBar"
import { AiOutlineEdit } from 'react-icons/ai';

import styled from "styled-components"


export const Profile = () => {
  
    const userProfile = useSelector(state => state.user.userData)

    const accessToken = useSelector((store) => store.user.accessToken);

    const [updatedData, setUpdatedData] = useState(null);
    const [username, setUsername ]= useState('');
    const [email, setEmail ]= useState('');
    const [password, setPassword ]= useState('');
    const [profileType, setProfileType] = useState('');
    const [animalType, setAnimalType] = useState('')
    const [preferableTime, setPreferableTime] = useState([])
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [img, setImg] = useState('')
    const [editImg, setEditImg] = useState(false)

    const [reviews, setReviews] = useState([]);

    const dispatch = useDispatch();

    const [edit, setEdit] = useState(false)

    const preferTimeOption = ['2-3 hours', ' > 5 hours', 'overnights', 'weekends', 'longer periods'];


  

    const onSubmit =  (e) => {
        e.preventDefault();
        setEdit(false)
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
                  profileType: profileType,
                  username: username, 
                  password: password,
                  img: img
                }),
              };
      fetch ('http://localhost:8080/edituser', options)
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
      fetch('http://localhost:8080/reviews')
      .then(res => res.json())
      .then(data => {
        if(data.success) {     
          const filterReviews = data.response.filter(item => item.revieweeId === userProfile._id)
          setReviews(filterReviews)
          //dispatch(user.actions.setError(''))
        } else {
          dispatch(user.actions.setError('Fail to load reviews'))
        }
      })
      .catch(error => console.log(error))
    }, [])
    


    useEffect(() => {
      const options = {
        method: 'GET',
        headers: {
            'Authorization': accessToken
        },
    }
      fetch('http://localhost:8080/users', options)
      .then((res) => res.json())
      .then((data) => {
        const userNew = data.find(item => item._id === userProfile._id)  
        setUpdatedData(userNew)
        setUsername(userNew.username)
        setImg(userNew.img)
        setEmail(userNew.email)
        setPassword(userNew.password)
        setStartDate(userNew.startDate)
        setEndDate(userNew.endDate)
        setAnimalType(userNew.animalType)
        setPreferableTime(userNew.preferableTime)   

        if (user) {
          dispatch(user.actions.setUserData(userNew))
        }
      })
  
    }, [])

  

    //Upload image
    const upload = async (e) => {
      const file = e.target.files[0];
      const base64  = await convertBase64(file)
      setImg(base64)
    }
    const convertBase64 = (file) => {
      alert(file.size + " KB.");
      return new Promise ((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result)
        }
        fileReader.onerror = (error) => {
          console.log(error)
          reject(error)
        }
      })
    }

  
    //Time checkbox
    const onTimeCheckbox = (time) => {
        if (preferableTime.includes(time)) {
          const timeArray = preferableTime.filter(item => item !== time );
          setPreferableTime(timeArray)
        }     
        else setPreferableTime([...preferableTime, time])
      }

    return (
        <Container>
          <SmallContainer>
            <Side>
              <ReviewHeading>Your reviews</ReviewHeading>
              <ReviewList>
                {reviews.length > 0 && reviews.map(item => {
                  return <Reviews>
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
            </Side>
            {updatedData && <FormContainer>
              <FormWrapper>
              <Form onSubmit={onSubmit}>
                <Header>
                  <ProfileImg src={img}/>
                  {!editImg && <EditBtn onClick={() => setEditImg(!editImg)}>Upload new picture</EditBtn> }
                  {editImg && <input  className = "imageInput"
                      type='file'
                      name="myImage"
                      onChange={(e) => upload(e)}
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
                  <Label htmlFor="password">
                      Password
                      <input 
                          id='password'
                          type='password'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}                  
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
                      return <RadioLabel htmlFor={item}>
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
            </FormContainer>}
          </SmallContainer>
        </Container>
    )

}

const Container = styled.div`
  height: 100vh;
  box-sizing: border-box;
  background-color: #fff;
  `

const SmallContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    height: 100vh;

`

const FormContainer = styled.div`
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  background-color: #fafafa;
  overflow-y: scroll;

`

const FormWrapper = styled.div`
  width: 700px;
  padding: 6rem 4rem 4rem 4rem;
  box-sizing: border-box;
`


const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  padding-bottom: 4rem;
`

const Heading = styled.h2`
  font-size: 2.4rem;
  margin: 3 0 1rem 0;
`
const Form = styled.form`
  display: flex;
  flex-direction: column; 
`

const ProfileImg = styled.img`
  width: 10rem;
  height: 10rem;
  object-fit: cover;
  border-radius: 50%;
`

const InputContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 5rem;
`

const Label = styled(Form)`
  flex-direction: column;
  margin-bottom: 3.2rem;
  gap: 1.2rem;
  font-size: 1.6rem;
  width: 30rem;

  input {
    align-self: flex-start;
    width: 50rem;
  }
  
`

const Checkbox = styled.div`
  margin-bottom: 3.2rem;

`

const P = styled.p`
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 1.6rem;
`
const RadioLabel = styled.label`
  display:flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.6rem; 
`

const RadioInput = styled.input`
  width: fit-content;
  color:#FD9951;
`

const DateLabel = styled(P)`
  margin: 0 0 0.2rem 0.2rem;
`


const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`
const SubmitBtn = styled.button`
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

const EditBtn = styled(SubmitBtn)`
   width: 18rem;
   margin-bottom: 0;
`

const Side = styled.div`
  width: 60rem;
  min-width: 20rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6rem 4rem 4rem 4rem;
  box-sizing: border-box;
  background-color: #ffff;
  overflow: scroll;

`

const ReviewList = styled.div`
      width: 100%;
      height: 100vh;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      overflow: scroll;
`
const Name = styled.p`
  font-size: 2.4rem;
  font-weight: 700;
  margin: 2rem 0 1rem 0;
`
const UserType = styled.span`
    font-size: 1.6rem;
`

const Reviews = styled.div`
  height: 15rem;
  padding: 2rem;
  box-sizing: border-box;
  border-bottom: solid 1px #eee;
  display: flex;
  flex-direction: row;
  gap: 2rem;

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


const ReviewHeading = styled.h2 `
  font-size: 2.4rem;
  align-self: flex-start;
  margin: 2rem;
`

const ReviewText = styled.p`
    color: #333;
`

const EmptyReview = styled.p`
   margin: 2rem;
   font-size: 1.8rem;
   color: #999;
   font-style: italic;
`