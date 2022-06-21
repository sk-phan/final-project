import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { user } from "../reducers/user";

import { MdSpaceDashboard } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';
import { BsBookmarkFill } from 'react-icons/bs';
import { HiOutlineLogout } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi'


export const NavBar = () => {
    const [searchInput, setSearchInput] = useState('');
    const [desktopSize, setDesktopSize] = useState(false)
    const dispatch = useDispatch();

    const onClickLogout = () => {
        dispatch(user.actions.setDeleteAccessToken(null));
    };

    
    return (
        <Header>
            <OpenBtn onClick={() => setDesktopSize(false)}>=</OpenBtn>
            <Nav 
                translate={desktopSize ? '280px' : '0'}
                opacity = {desktopSize ? '0' : '1'}
                zIndex = {desktopSize ? '-2' : '5'}
            >
                <NavHead>
                    <Logo>Logo</Logo>
                    <CloseBtn onClick={() => setDesktopSize(true)}>x</CloseBtn>
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
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`

const Nav = styled.nav`
    width: 280px;
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
    z-index: ${(props) => props.zIndex};
    transition: ease-in-out 1s;


`

const NavHead = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

`

const CloseBtn = styled.button`
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background-color: transparent;
    border: solid 1px #000;

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

    /* input[type=search]::-ms-clear {  display: none; width : 0; height: 0; }
    input[type=search]::-ms-reveal {  display: none; width : 0; height: 0; } */

    svg {
        fill: #000;
        font-size: 2rem;
    }
`

const SearchBar = styled.input`
    align-self: flex-start;
`

