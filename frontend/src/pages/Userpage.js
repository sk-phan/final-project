import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { user } from "../reducers/user";
import { NavBar } from "../components/NavBar";
import moment from 'moment';
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs';
import { Loader } from "../components/Loader";

import { IoIosOptions } from 'react-icons/io';
import { API_URL } from "../utils/url";

import { Main, BigContainer, 
         SmallContainer, UserContainer,
         ProfileImageContainer, ProfileTextContainer,
         ProfileTitle, ProfileText, LocationText, Tags, Tag,
         Overlay, FilterContainer, FilterButton, FilterForm,
         FilterText, FilterTitleContainer, ExitButton, RadioLabel,
         RadioInput, Img  
        } from "../styling/UserPageStyle";


export const Userpage = () => {

  const [usersData, setUsersData] = useState([])
  const [filteredUsersData, setFilteredUsersData] = useState([])
  const accessToken = useSelector((store) => store.user.accessToken);
  const userProfile = useSelector(state => state.user.userData)

  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showFilt, setShowFilt] = useState(false)

  const [animalFilter, setAnimalFilter] = useState('all')
  const [serviceFilter, setServiceFilter] = useState([])
  const serviceOptions = ['2-3 hours', ' > 5 hours', 'overnights', 'weekends', 'longer periods'];

  const [favorites, setFavorites] = useState(userProfile.favorites)

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
    fetch(API_URL('users'), options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      const user = data.find(item => item._id === userProfile._id)
      setUserData(user)
      setFavorites(user.favorites)

      if(user.profileType === 'Pet owner'){
        const usersToShow = data.filter(user => user.profileType === 'Pet sitter')
        setUsersData(usersToShow)
        setFilteredUsersData(usersToShow)
      }
      else {
        const usersToShow = data.filter(user => user.profileType === 'Pet owner')
        setUsersData(usersToShow)
        setFilteredUsersData(usersToShow)
      } 
    })
    .finally(() => setLoading(false))

  }, [])

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
  
  useEffect(() => {

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        userId: userProfile._id,
        favorites: favorites,
      }),
    }
     fetch(API_URL('edituser'), options)
  
  }, [favorites])  

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
          'Authorization': accessToken
      },
  }
    fetch(API_URL('users'), options)
    .then((res) => res.json())
    .then((data) => {
      const useri = data.find(item => item._id === userData._id)

      if (useri) {
        dispatch(user.actions.setUserData(useri)) 
      }
    })

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
  const usersToShow = [...usersData]
  setFilteredUsersData(usersToShow)
  setShowFilt(false)
}

const onExitClick = () => {
  setShowFilt(false)
}


 
  return (
    <>
    <NavBar />
   <Main>
		{loading && <Loader />}
		{!loading && 
    <>
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
            return <RadioLabel htmlFor={item} key={item}>
                  
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
   {!showFilt && 
   <BigContainer>
        <FilterButton onClick={onFilterClick}><FilterText>Filter </FilterText> <IoIosOptions /></FilterButton>
        
        <SmallContainer>
          {filteredUsersData.length > 0 && filteredUsersData.map(user => {
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
          
         { filteredUsersData.length === 0 && <ProfileTitle>Sorry, no matching users...</ProfileTitle> }
        </SmallContainer>
    </BigContainer>}
     </>
    }
    </Main>
    </>
  );
};


