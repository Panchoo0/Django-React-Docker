import styled from "styled-components";

const ContentWrapperNavbar = styled.div`
    position: relative;
    transition: all 0.5s ease;
    left: ${(props) => (props.open ? "350px" : "88px")};
    width: ${(props) => (props.open ? "calc(100% - 350px)" : "calc(100% - 88px)")};
    min-height: 100vh;
    height: 100%;
    background: var(--color-body);
    color: var(--color-text);
    font-size: 30px;
    font-weight: 900;
    padding: 30px;
    
`;

export default ContentWrapperNavbar;

export const ContentWrapper = styled.div`
    position: relative;
    min-height: 100vh;
    height: 100vh;
    width: 100%;
    background: var(--color-body);
    color: var(--color-text);
    font-size: 30px;
    font-weight: 900;
    padding: 30px;
    justify-content: center;
    display: flex;
    align-items: center;
`;
