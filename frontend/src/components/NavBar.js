import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components/macro";
import { useDispatch } from "react-redux";
import { user } from "../reducers/user";

import { MdSpaceDashboard } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';
import { BsBookmarkFill } from 'react-icons/bs';
import { HiOutlineLogout } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi'

import logo from '../assets/logo1.svg'


export const NavBar = ( {search, setSearch} ) => {
    const [desktopSize, setDesktopSize] = useState(true)
    const dispatch = useDispatch();

    const onClickLogout = () => {
        dispatch(user.actions.setDeleteAccessToken(null));
    };
    
 
    return (
        <Header>
            <OpenBtn zIndex={desktopSize ? '10' : '-10'} onClick={() => setDesktopSize(false)}>=</OpenBtn>
            <Nav 
                translate={desktopSize ? '280px' : '0'}
                opacity = {desktopSize ? '0' : '1'}
                zIndex = {desktopSize ? '-2' : '5'}
                display = {desktopSize ? 'none' : 'flex'}
            >
                <NavHead>
                    <NavLink className='logo-link' to='/userpage'>
                        <Logo src={logo} />
                    </NavLink>
´                    <CloseBtn onClick={() => setDesktopSize(true)}>x</CloseBtn>
                </NavHead>
                <Seach>
                    <SearchBar 
                        type='search'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="search username"
                    />
                    <button><BiSearch/></button>

                </Seach>
                <NavEl to='/userpage'>
                    <MdSpaceDashboard className="nav-icon"/>
                    Dashboard
                </NavEl>
                <NavEl to='/profile'>
                    <BsFillPersonFill className="nav-icon" />
                    Profile
                </NavEl>
                <NavEl to='/favorites'>
                    <BsBookmarkFill className="nav-icon" />
                    Favourites
                </NavEl>
                <NavEl to='/' onClick={onClickLogout}>
                    <HiOutlineLogout className="nav-icon" />
                    Log out
                </NavEl>
            </Nav>
           
        </Header>
    )
}

const Header = styled.header `
    background-color: #fff;


`

const Nav = styled.nav`
    width: 320px;
    height: 100vh;
    background-color: #FCFBFB;
    display: ${(props) => props.display};
    flex-direction: column;
    gap: 3rem;
    box-sizing: border-box;
    padding: 4rem;
    position: absolute;
    top: 0;
    z-index: ${(props) => props.zIndex};
    transition: ease-in-out 1s;
     


`

const NavHead = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4rem 0;

`

const CloseBtn = styled.button`
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    background-color: transparent;
    border: solid 1.5px #000;
    color: #000;
    right: 35px;
    cursor: pointer;
    font-size: 1.6rem;
    z-index: 10;
    position: absolute;
    top: 20px;
    right: 10px;

    &:hover {
        border: solid 1.5px #FD9951;
        color: #FD9951;
    }

`

const OpenBtn = styled(CloseBtn)`
    z-index: ${(props) => props.zIndex};
    position: absolute;
    left: 20px;
    top: 20px;
   
`

const Logo = styled.img`
    width: 30rem;
    height: auto;
`

const NavEl = styled(NavLink) `
    font-size: 1.8rem;
    color: #000;
    background-color: #F6F4F4;
    padding: 2.4rem;
    border-radius: 5px; 
    text-decoration: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;

    @media (max-width: 785px) {
        padding: 3.2rem;
    }

`

const Seach = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    box-sizing: border-box;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;

    input, button {
        background-color: transparent;
        border: none;
    }

    input {
        outline: none; 
        width: 100%;
        font-size: 1.8rem;
        z-index: 10;
    }

    svg {
        fill: #000;
        font-size: 2rem;
    }
`

const SearchBar = styled.input`
    align-self: flex-start;
`

