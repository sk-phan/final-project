import React from "react";
import { useNavigate } from "react-router-dom";
import { Main, NotfoundContainer,
    NotfoundTextContainer, NotfoundTitle, 
    NotfoundSubtitle, BackBtn, NotfoundImg } from "../styling/NotFoundStyle";

export const NotFound = () => {
    const navigate = useNavigate()
    return(
        <Main>
            <NotfoundContainer>
                <NotfoundTextContainer>
                    <p>Logo</p>
                    <NotfoundTitle>Oops!</NotfoundTitle>
                    <NotfoundSubtitle>Page can't be found.</NotfoundSubtitle>
                    <BackBtn onClick={() => navigate('/')}>To home page</BackBtn>
                </NotfoundTextContainer>
                <NotfoundImg  src="https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=717&q=80"/> 

            </NotfoundContainer>
        </Main>
    )
}

