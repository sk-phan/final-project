import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { user } from "../reducers/user";
import { NavBar } from "../components/NavBar";
import styled from 'styled-components'
import moment from 'moment';

export const Userpage = () => {

  const [usersData, setUsersData] = useState([])
  const accessToken = useSelector((store) => store.user.accessToken);
  const profile = useSelector((store) => store.user.userData.profileType);
  const dispatch = useDispatch();
  const navigate = useNavigate();
   

  const onClickLogout = () => {
    dispatch(user.actions.setDeleteAccessToken(null));
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  

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
      if(profile === 'Pet owner'){
        const usersToShow = data.filter(user => user.profileType === 'Pet sitter')
        setUsersData(usersToShow)
        dispatch(user.actions.setOtherUsersData(usersToShow))
      }
      else {
        const usersToShow = data.filter(user => user.profileType === 'Pet owner')
        setUsersData(usersToShow)
        dispatch(user.actions.setOtherUsersData(usersToShow))
      }
      
      console.log(data)
    })
  }, [])

  console.log(usersData,'userdata')
  console.log(profile,'profile')
  return (
    <BigContainer>
        <NavBar />
        <SmallContainer>
           {usersData ? usersData.map(user => {
            return ( 
            <UserContainer to={`/userdetails/${user._id}`} key={user._id}>
            <ProfileImageContainer>
              <Img src={user.img} />
            </ProfileImageContainer>
            <ProfileTextContainer>
              <ProfileTitle>@{user.username}</ProfileTitle>
              {user.profileType === 'Pet sitter' ? <ProfileText>{user.profileType} for {user.animalType}s </ProfileText> : <ProfileText>Looking for a {user.animalType} pet sitter</ProfileText>}
              <Tags>
                {user.preferableTime.map(time => {
                return <Tag>{time}</Tag>})}
              </Tags>
              <ProfileText>{moment(user.startDate).format('MMM Do YY')} - {moment(user.endDate).format('MMM Do YY')}</ProfileText>

            </ProfileTextContainer>
            <Overlay></Overlay>


          </UserContainer>
            )

          }) : <p>LOADING</p>}
        </SmallContainer>
    </BigContainer>
  );
};


const BigContainer = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
 

 
  
`

const SmallContainer = styled.div`
  display:flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 320px;
  gap: 20px;
  padding:10px;

  @media (min-width: 768px) {
   width: 700px;
  }

  @media (min-width: 1025px) {
    width: 1000px;
   }
`

const UserContainer = styled(Link)`
   position: relative;
   display:flex;
   flex-direction: column;
   overflow:hidden;
   width: 150px;
   height: 200px;
   background-color: #fff;
   box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.04);
   border-radius:10px;
   text-decoration: none;

   @media (min-width: 768px) {
    width: 200px;
    height 270px;
   }
 
   @media (min-width: 1025px) {
     width: 220px;
     height: 300px;
    }
`

const ProfileImageContainer = styled.div`
    width: 100%;
    height: 50%;
    background-color: red;
    box-sizing: border-box;

`

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-sizing: border-box;
`
const ProfileTextContainer = styled.div`
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
  color: #666666;
  font-weight: 500;
  font-size: 10px;
  margin:0;
  @media (min-width: 768px) {
    font-size: 14px;
   }
`
const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    
`
const Tag = styled.span`
  
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

const Overlay = styled.div`
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