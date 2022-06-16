import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { user } from "../reducers/user";
import { NavBar } from "../components/NavBar";
import styled from 'styled-components'
import moment from 'moment';
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs';
import { Loader } from "../components/Loader";
import Autocomplete from "react-google-autocomplete";

import { IoIosOptions } from 'react-icons/io';



export const Userpage = () => {

  const [usersData, setUsersData] = useState([])
  const [filteredUsersData, setFilteredUsersData] = useState([])
  const accessToken = useSelector((store) => store.user.accessToken);
  const profile = useSelector((store) => store.user.userData.profileType);
  const otherUsersData = useSelector((store) => store.user.otherUsersData)
  const userData = useSelector((store) => store.user.userData)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showFilt, setShowFilt] = useState(false)
  const [location, setLocation] = useState()

  const [animalFilter, setAnimalFilter] = useState('all')
  const [serviceFilter, setServiceFilter] = useState([])
  const serviceOptions = ['2-3 hours', ' > 5 hours', 'overnights', 'weekends', 'longer periods'];
  // const [startDateFilter, setStartDateFilter] = useState()
  // const [endDateFilter, setEndDateFilter] = useState()
  

  const [favorites, setFavorites] = useState(userData.favorites)


  

  

  //log out click
  // const onClickLogout = () => {
  //   dispatch(user.actions.setDeleteAccessToken(null));
  // };

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
    setLoading(true) 
    fetch('http://localhost:8080/users', options)
    .then((res) => res.json())
    .then((data) => {
      if(profile === 'Pet owner'){
        const usersToShow = data.filter(user => user.profileType === 'Pet sitter')
        setUsersData(usersToShow)
        setFilteredUsersData(usersToShow)
        dispatch(user.actions.setOtherUsersData(usersToShow))
      }
      else {
        const usersToShow = data.filter(user => user.profileType === 'Pet owner')
        setUsersData(usersToShow)
        setFilteredUsersData(usersToShow)
        dispatch(user.actions.setOtherUsersData(usersToShow))
      }
    })
    .finally(() => setLoading(false))
  }, [])

  const addTofavorites = (user, e) => {
    e.preventDefault()

    if (favorites.some(item => item._id === user._id) ) {
      const newFavorites = favorites.filter(item => item._id !== user._id );
      setFavorites(newFavorites)
      
    } 
    else {
      setFavorites([...favorites, user])
     
    }
  }



useEffect(() => {
  console.log('activates');
  const options = {
    method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ 
                userId: userData.userId,
                favorites: favorites,
              }),
  }
  fetch ('http://localhost:8080/edituser', options)
    .then ((res) => res.json())
    .then ((data) => console.log('results', data))
    .catch(error => console.log(error))

}, [favorites])

const onFilterSubmit = (e) => {
  e.preventDefault()
  
  if (animalFilter !== 'all') {
    const usersToShow = [...usersData]
    if (serviceFilter.length > 0){
        setFilteredUsersData(usersToShow.filter(user => user.preferableTime.some(element => serviceFilter.includes(element)) && user.animalType === animalFilter))
    } 
    else {
        setFilteredUsersData(usersToShow.filter(user => user.animalType === animalFilter))
    } 
  }
  else {
    const usersToShow = [...usersData]
    if (serviceFilter.length > 0){
        setFilteredUsersData(usersToShow.filter(user => user.preferableTime.some(element => serviceFilter.includes(element))))
      }
    else {
        setFilteredUsersData(usersToShow)
      
    }
    
  }
  setShowFilt(!showFilt)
}

const onServiceCheckbox = (time) => {
  if (serviceFilter.includes(time)) {
    const timeArray = serviceFilter.filter(item => item !== time );
    setServiceFilter(timeArray)
  } 

  else setServiceFilter([...serviceFilter, time])
}

const onFilterClick = () => {
  setShowFilt(true)
}

const onResetFilters = () => {
  setAnimalFilter('all')
  setServiceFilter([])
  setLocation()
  const usersToShow = [...usersData]
  setFilteredUsersData(usersToShow)
  setShowFilt(false)
}

const onExitClick = () => {
  setShowFilt(false)
}

console.log(showFilt)
  return (
    <>
     <NavBar /> 
    <Main>
		{loading && <Loader />}
		{!loading && 
     <div>
    {showFilt &&
        <FilterContainer display={showFilt ? 'flex' : 'none'}>
        <FilterTitleContainer>
          <ProfileTitle>FILTERS</ProfileTitle>
          <ExitButton onClick={onExitClick}>x</ExitButton>
        </FilterTitleContainer>
        <FilterForm>
        <div className="checkbox-container">
        <ProfileTitle>Type of animal</ProfileTitle>
          <select 
            id='animalFilter'
						value={animalFilter}
						onChange={(e) => setAnimalFilter(e.target.value)}>
            <option selected={true} disabled='disabled'>
							CHOOSE ANIMAL TYPE:
						</option>
						<option value='all'>All</option>
						<option value='dog'>Dogs</option>
            <option value='cat'>Cats</option>
          </select>
          </div>
          <div className="checkbox-container">
          <ProfileTitle>Duration of pet sitting</ProfileTitle>
          {serviceOptions.map(item => {
             return <RadioLabel htmlFor={item}>
                  
                    <RadioInput
                      id={item}
                      type='checkbox'
                      value = {item}
                      checked = {serviceFilter.includes(item)}
                      onChange = { () => onServiceCheckbox(item) }      
                    />
                
                    {item}
             </RadioLabel>})}
             </div>
             <FilterTitleContainer>
              <FilterButton type='submit' onClick={onFilterSubmit}>Filter</FilterButton>
              <FilterButton type="button" onClick={onResetFilters}>Reset All</FilterButton>
            </FilterTitleContainer>
        </FilterForm>
        </FilterContainer>
        }
   {!showFilt && <BigContainer>
        <FilterButton onClick={onFilterClick}><FilterText>FILTER </FilterText> <IoIosOptions /></FilterButton>
        
        <SmallContainer>
           {filteredUsersData.length > 0 && filteredUsersData.map(user => {
            return ( 
            <UserContainer  to={`/userdetails/${user._id}`} key={user._id}>
            <ProfileImageContainer>
              <Img src={user.img} />
            </ProfileImageContainer>
            <ProfileTextContainer>
            
              <ProfileTitle>@{user.username}
              {favorites.some(item => item._id === user._id) 
              ? <BsBookmarkFill className="userpage-nav-icon" onClick={ (e) => addTofavorites(user, e) } /> 
              : <BsBookmark className="userpage-nav-icon" onClick={ (e) => addTofavorites(user, e) } />} 
              </ProfileTitle> 
              <ProfileText><span>📍</span>{user.location}</ProfileText>
              
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
          
         { filteredUsersData.length === 0 && <ProfileTitle>Sorry, no matching users...</ProfileTitle> }
        

        </SmallContainer>
       

    </BigContainer>}
     </div>
    }
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
   height: 220px;
   background-color: #fff;
   box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.04);
   border-radius:10px;
   text-decoration: none;

   @media (min-width: 768px) {
    width: 200px;
    height: 270px;
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
    cursor: pointer;
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



