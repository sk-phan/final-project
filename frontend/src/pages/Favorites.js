import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { user } from "../reducers/user";
import { NavBar } from "../components/NavBar";
import styled from 'styled-components'
import moment from 'moment';
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs';
import { Loader } from "../components/Loader";


export const Favorites = () => {

  
  const [usersData, setUsersData] = useState([])
  const [filteredUsersData, setFilteredUsersData] = useState([])
  const accessToken = useSelector((store) => store.user.accessToken);
  const profile = useSelector((store) => store.user.userData.profileType);
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user.userData)
  const [favorites, setFavorites] = useState(userData.favorites)
  


  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);


  
  useEffect(() => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        userId: userData._id,
        favorites: favorites,
      }),
    }
    console.log(favorites,'fav')
     fetch ('http://localhost:8080/edituser', options)
    .then ((res) => res.json())
    .then ((data) => console.log(data))
    .catch(error => console.log(error))
    .finally(() => console.log(userData,'USERDATA'))
  }, [favorites])  


  const addTofavorites = async (user, e) => {
    e.preventDefault()

    if (favorites.some(item => item._id === user._id)) {
      const newFavorites = await favorites.filter(item => item.username !== user.username );
      setFavorites(newFavorites)
    } 
    else {
      setFavorites([...favorites, user])
    } 
  }
  




  return (
    <>
     <NavBar /> 
    <Main>
		{loading && <Loader />}
		{!loading && 
     <BigContainer>
        
        <SmallContainer>
           {favorites.map(user => {
            return ( 
            <UserContainer  to={`/userdetails/${user._id}`} key={user._id}>
            <ProfileImageContainer>
              <Img src={user.img} />
            </ProfileImageContainer>
            <ProfileTextContainer>
              <ProfileTitle>@{user.username}{favorites.some(item => item._id === user._id) 
              ? <BsBookmarkFill className="userpage-nav-icon" onClick={ (e) => addTofavorites(user, e) } /> 
              : <BsBookmark className="userpage-nav-icon" onClick={ (e) => addTofavorites(user, e) } />} 
              </ProfileTitle> 
              <LocationText><span>📍</span>{user.location}</LocationText>
              
              {user.profileType === 'Pet sitter' ? <ProfileText>{user.profileType} for {user.animalType}s </ProfileText> : <ProfileText>Looking for a {user.animalType} pet sitter</ProfileText>}
              <Tags>
                {user.preferableTime.map(time => {
                return <Tag key={time}>{time}</Tag>})}
              </Tags>
              <ProfileText>{moment(user.startDate).format('MMM Do YY')} - {moment(user.endDate).format('MMM Do YY')}</ProfileText>

            </ProfileTextContainer>
            <Overlay></Overlay>


          </UserContainer>
            )

          })}
        

        </SmallContainer>
       

    </BigContainer>}
    
    </Main>
    </>
  );
};

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
   display:flex;
   width: 100%;
   justify-content: space-between;
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

const LocationText = styled.p`
font-family: 'Raleway', sans-serif;
  color: #000;
  font-weight: 900;
  font-size: 9px;
  margin:0;
  @media (min-width: 768px) {
    font-size: 11px;
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

const FilterContainer = styled.div`
    background: red;
    display: ${props => props.display}
    flex-wrap: wrap;
    width: 320px;
    gap: 20px;
    padding:10px;
    background-color: #fff;
    box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.04);
    border-radius:10px;

`

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  width: fit-content;
  gap: 1rem;
  background-color: transparent;
  border: solid 1.5px #000;
  color: #000;
  border-radius: 10px;
  padding:7px;
  margin: 10px;

  &:hover{
    background-color: #4C956C;
    border: solid 1.5px #4C956C;
    cursor: pointer;
    color: #fff;
  }
  
`
const FilterForm = styled.form`
`

const FilterText = styled.p`
font-family: 'Raleway', sans-serif;
padding:0;
margin:0;
font-weight: 700;
font-size: 12px;

`

const FilterTitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content:space between;
`

const ExitButton = styled.button`
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

const RadioLabel = styled.label`
  display:flex;
  align-items: center;
  font-size: 14px;
`

const RadioInput = styled.input`
  width: fit-content;
  color:#FD9951;
`



