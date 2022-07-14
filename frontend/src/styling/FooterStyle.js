import styled from "styled-components";

export const FooterContainer = styled.div`
    width:100vw;
    height: 500px;
    padding-bottom: 2rem;
    background: #FD9951;
    color: #FEFEE3;
    display:flex;
    flex-direction: column;
    justify-content:space-between;
    align-items:center;
    overflow: hidden;

    @media (min-width: 768px) {
       flex-direction: row;
       height: 200px;
       overflowg: hidden;
       }
     
`
export const SmallContainer = styled.div`
    display:flex;
    flex-direction: column;
    gap: 5rem;
    height: 100%;

    svg {
        color: #FEFEE3;
        width: 3rem;
        height: 3rem;

    }

    @media (min-width: 768px) {
        width: 700px;
        width: 3rem;
        height: 3rem;
        flex-direction: row;
        align-items: center;
        justify-content: center;

       }
     
       @media (min-width: 1025px) {
         width: 1000px;
        }
`

export const LinkContainer = styled.div`
    display:flex;
    flex-direction: column;
    gap: 2rem;

    
`

export const Link = styled.div`
    display: flex;
    align-items: center;
    gap: 1.6rem;

    a:link, a:visited {
        color: #FEFEE3;
        font-size: 1.8rem;
        text-decoration: none;
    }
    
    a:hover, a:active {
        color: #eee;
        text-decoration: underline;
    }
`


export const Logo = styled.img`
   width: 25rem;
   height: 25rem;
   object-fit: cover;
`
