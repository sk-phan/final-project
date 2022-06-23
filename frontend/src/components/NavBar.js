import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { user } from "../reducers/user";

import { MdSpaceDashboard } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';
import { BsBookmarkFill } from 'react-icons/bs';
import { HiOutlineLogout } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi'

import logo from '../assets/logo1.svg'


export const NavBar = () => {
    const [searchInput, setSearchInput] = useState('');
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
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder='search'
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
    width: 400px;
    height: 100vh;
    background-color: #FCFBFB;
    //display: ${(props) => props.display};
    display: flex;
    flex-direction: column;
    gap: 3rem;
    box-sizing: border-box;
    padding: 4rem;
    position: absolute;
    z-index: ${(props) => props.zIndex};
    transition: ease-in-out 1s;
    
    @media (max-width: 785px) {
        padding: 3.2rem;
        width: 300px;
        height: 100vh;
        top: 0;
        display: ${(props) => props.display};

    }

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
    right: 35px;
    cursor: pointer;
    font-size: 1.6rem;
    display: none;

    &:hover {
        border: solid 1.5px #FD9951;
        color: #FD9951;
    }
    @media (max-width: 785px) {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 4rem;
        height: 4rem;
        font-size: 2.2rem;
    }
`

const OpenBtn = styled(CloseBtn)`
    display: none;
    z-index: ${(props) => props.zIndex};

    @media (max-width: 785px) {
        display: inline-block;
    }
    
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
    }

    svg {
        fill: #000;
        font-size: 2rem;
    }
`

const SearchBar = styled.input`
    align-self: flex-start;
`

