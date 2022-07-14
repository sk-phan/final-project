import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { user } from "../reducers/user";

import { MdSpaceDashboard } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';
import { BsBookmarkFill } from 'react-icons/bs';
import { HiOutlineLogout } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi'

import logo from '../assets/logo1.svg'

import { Header, Nav, NavHead, CloseBtn, OpenBtn,
Logo, NavEl, Seach, SearchBar } from "../styling/NavbarStyle";


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

