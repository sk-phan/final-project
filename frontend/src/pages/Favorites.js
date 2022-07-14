import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import moment from 'moment';
import { BsBookmarkFill } from 'react-icons/bs';
import { Loader } from "../components/Loader";

import { Main,BigContainer, SmallContainer, UserContainer,
  ProfileImageContainer, Img, ProfileTextContainer, ProfileTitle,
  EmptyTitle, ProfileText, LocationText, Tags, Tag, Overlay } from "../styling/FavoritesStyle";


import { API_URL } from "../utils/url";
export const Favorites = () => {


  const userProfile = useSelector(store => store.user.userData)
  const accessToken = useSelector((store) => store.user.accessToken);

  const [loading, setLoading] = useState(false)
  const [favorites, setFavorites] = useState(userProfile.favorites)
  
  const navigate = useNavigate();


  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    setLoading(true) 
    const options = {
      method: 'GET',
      headers: {
          'Authorization': accessToken
      },
  }
    fetch(API_URL('users'), options)
    .then((res) => res.json())
    .then((data) => {
    
      const user = data.find(item => item._id === userProfile._id)
      setFavorites(user.favorites)

    })
    .finally(() => setLoading(false))

  }, [])



  return (
    <>
     <NavBar /> 
    <Main>
		{loading && <Loader />}
		{!loading && 
     <BigContainer>
        
        <SmallContainer>
           {favorites.length > 0 && favorites.map(user => {
            return ( 
            <UserContainer  to={`/userdetails/${user._id}`} key={user._id}>
            <ProfileImageContainer>
              <Img src={user.img} />
            </ProfileImageContainer>
            <ProfileTextContainer>
              <ProfileTitle>@{user.username}
               <BsBookmarkFill/> 
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
        
        { favorites.length === 0 && <EmptyTitle>You have no favorites users yet...</EmptyTitle> }
        </SmallContainer>
       

    </BigContainer>}
    
    </Main>
    </>
  );
};






