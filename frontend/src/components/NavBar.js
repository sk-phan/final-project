import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import { MdSpaceDashboard } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';
import { BsBookmarkFill } from 'react-icons/bs';
import { HiOutlineLogout } from 'react-icons/hi';

export const NavBar = () => {
    const [searchInput, setSearchInput] = useState('');
    const [desktopSize, setDesktopSize] = useState(false)

    
    return (
        <Header>
            <OpenBtn onClick={() => setDesktopSize(false)}>=</OpenBtn>
            <Nav 
                translate={desktopSize ? '200px' : '0'}
                opacity = {desktopSize ? '0' : '1'}
            >
                <NavHead>
                    <Logo>Logo</Logo>
                    <CloseBtn onClick={() => setDesktopSize(true)}>x</CloseBtn>
                </NavHead>
                <SearchBar 
                    type='search'
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder='search'
                />
                <NavEl to='#'>
                    <MdSpaceDashboard className="nav-icon"/>
                    Dashboard
                </NavEl>
                <NavEl to='#'>
                    <BsFillPersonFill className="nav-icon" />
                    Profile
                </NavEl>
                <NavEl to='#'>
                    <BsBookmarkFill className="nav-icon" />
                    Favourite
                </NavEl>
                <NavEl to='#'>
                    <HiOutlineLogout className="nav-icon" />
                    Log out
                </NavEl>
            </Nav>
        </Header>
    )
}

const Header = styled.header `
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    height: 100vh;
`

const Nav = styled.nav`
    width: 200px;
    height: 100%;
    background-color: #FCFBFB;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    box-sizing: border-box;
    padding: 2rem;
    position: absolute;
    transform: translateX(${(props) => props.translate});
    opacity: ${(props) => props.opacity};
    transition: ease-in-out 1s;
    //animation: ${(props) => props.animation} 2s ease-in-out;
`

const NavHead = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const CloseBtn = styled.button`
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
`

const OpenBtn = styled(CloseBtn)`
`

const Logo = styled.p`
    font-size: 2.4rem;
`

const NavEl = styled(NavLink) `
    font-size: 1.8rem;
    color: #000;
    background-color: #F6F4F4;
    padding: 1.8rem;
    border-radius: 5px;
    text-decoration: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
`


const SearchBar = styled.input`
    align-self: flex-start;
`
