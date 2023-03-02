import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import SideBarContext from "../contexts/SideBarContext";
import styled from "styled-components";
import { FaHome, FaChevronRight, FaListUl, FaChevronLeft } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { FiSun } from "react-icons/fi";
import { BsMoon } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
/*
    Cada elemento que redirecciona a otra página, incluye ícono y texto
*/

const StyledLink = styled(Link)`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
    color: inherit;
    font-size: 24px;
`;

/*
    Nav con toda la barra de navegación
*/
const SideBar = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    transition: all 0.5s ease;
    width: ${(props) => (props.open ? "350px" : "88px")};
    background: var(--color-sidebar);
    padding: 10px 14px;
    z-index: 15;
    color: var(--color-icons);
`;

/* 
    Logo con la imagen y texto del nav
*/
const Logo = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    color: var(--color-icons);
`;
/* 
    Wrapper para la imagen del logo
*/
const SpanImage = styled.span`
    min-width: 60px;
    display: flex;
    align-items: center;
`;

/* 
    Texto del logo
*/
const SpanName = styled.span`
    font-size: 24px;
    font-weight: 700;
    display: flex;
    flex-direction: column;

    visibility: ${(props) => (props.open ? "visible" : "hidden")};
    opacity: ${(props) => (props.open ? "1" : "0")};
    transition-duration: ${(props) => (props.open ? "0.1s, 0.1s" : "0.15s, 0.3s")};
    transition-delay: ${(props) => (props.open ? "0s, 0.15s" : "0s, 0s")};
    transition-property: visibility, opacity;
    color: inherit;
`;

const Header = styled.header`
    position: relative;
`;

/* 
    Div que contiene a todos los link de la sidebar sin contar el logo de inicio
*/
const MenuBar = styled.div`
    height: calc(100% - 70px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;


/*
    Lista Con todas las Apps
*/
const MenuLinks = styled.ul``;

/*
    Cada App de la sidebar
*/
const NavLink = styled.li`
    height: 50px;
    margin-top: 10px;
    list-style: none;
    display: flex;
    align-items: center;
    border-radius: 10px;
    transition: all 0.4s ease;
    :hover {
        background: var(--color-hover);
    }
`;

/* 
    Toggler de la sidebar
*/
const StyledFaChevronRight = ({ open, onClick }) => {
    return (
        <>
            {!open ? (
                <FaChevronRightContainer onClick={onClick}>
                    <FaChevronRight size={20}></FaChevronRight>
                </FaChevronRightContainer>
            ) : (
                <FaChevronRightContainer onClick={onClick}>
                    <FaChevronLeft size={20}></FaChevronLeft>
                </FaChevronRightContainer>
            )}
        </>
    );
};

/* 
   Container del toggler de la sidebar
*/
const FaChevronRightContainer = styled.div`
    position: absolute;
    top: 50%;
    right: -30px;
    transform: translateY(-50%);
    height: 35px;
    width: 35px;
    background: var(--color-component);
    border-style: solid;
    border-color: var(--color-contrastText);
    border-width: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: #f5ffc9;
    font-size: 25px;
    cursor: pointer;
    z-index: 10;
`;

/*
    Span para el texto de cada app de la sidebar
*/
const NavText = styled.span`
    visibility: ${(props) => (props.open ? "visible" : "hidden")};
    opacity: ${(props) => (props.open ? "1" : "0")};
    transition-duration: ${(props) => (props.open ? "0.1s, 0.1s" : "0.15s, 0.3s")};
    transition-delay: ${(props) => (props.open ? "0s, 0.15s" : "0s, 0s")};
    transition-property: visibility, opacity;
    color: inherit;
`;

/*
    Icons de la sidebar
*/

const StyledTasks = styled(FaListUl)`
        min-width: 60px;
        font-size: 20px;
        color: inherit;
`;

const StyledBiLogOut = styled(BiLogOut)`
        min-width: 60px;
        font-size: 20px;
        color: inherit;
`;

const StyledVscAccount= styled(VscAccount)`
        min-width: 60px;
        font-size: 20px;
        color: inherit;
`;


const StyledFiSun = styled(FiSun)`
        min-width: 60px;
        font-size: 20px;
        color: inherit;
`;

const StyledBsMoon = styled(BsMoon)`
        min-width: 60px;
        font-size: 20px;
        color: inherit;
`;


/*
    Div para los elementos del fondo
*/
const BottomContent = styled.div``;

/*
    Container para el botón de deslogeo
*/
const Logout = styled(NavLink)``;

/*
    Container para el botón de Modo oscuro
*/
const ModoOscuro = styled(NavLink)`
    height: 50px;
    margin-top: 10px;
    list-style: none;
    display: flex;
    align-items: center;
    border-radius: 10px;
    transition: all 0.4s ease;
    color: inherit;
    cursor: pointer;
`;

/*
    Texto para el contenido del modo oscuro
*/
const StyledText = styled.div`
    transition: all 0.2s ease;
    
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
    color: inherit;
    font-size: 24px;

`;

const StyledButton = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
    color: inherit;
    font-size: 24px;
`;




const Navbar = () => {
    let { logoutUser, auth } = useContext(AuthContext);
    let { darkMode, open, setDarkMode, setOpen } = useContext(SideBarContext);

    return (
        <SideBar open={open}>
            <Header>
                <StyledLink to="/">
                    <Logo>
                        <SpanImage>
                            <FaHome size={40}></FaHome>
                        </SpanImage>

                        <SpanName open={open}>Inicio</SpanName>
                    </Logo>
                </StyledLink>
                <StyledFaChevronRight open={open} onClick={() => setOpen(!open)} />
            </Header>

            <MenuBar>
                <MenuLinks>
                    <NavLink>
                        <StyledLink to="/tareas">
                            <StyledTasks />
                            <NavText open={open}>Tareas</NavText>
                        </StyledLink>
                    </NavLink>

                    <NavLink>
                        <StyledLink to="/tareas">
                            <StyledTasks />
                            <NavText open={open}>Tareas 2</NavText>
                        </StyledLink>
                    </NavLink>

                    <NavLink>
                        <StyledLink to="/tareas">
                            <StyledTasks />
                            <NavText open={open}>Tareas 3</NavText>
                        </StyledLink>
                    </NavLink>


                </MenuLinks>
                <BottomContent>
                    <Logout>
                        {auth ? (
                            <StyledText onClick={logoutUser}>
                                <StyledBiLogOut  />
                                <NavText open={open}>
                                    Cerrar Sesión
                                </NavText>
                            </StyledText>
                        ) : (
                            <StyledLink to="/login">
                                <StyledVscAccount />
                                <NavText open={open}>Iniciar Sesión</NavText>
                            </StyledLink>
                        )}
                    </Logout>
                    <ModoOscuro onClick={() => setDarkMode(!darkMode)}>
                        {darkMode ? (
                            <StyledButton>
                                <StyledFiSun />
                                <NavText open={open}>
                                    Modo Claro
                                </NavText>
                            </StyledButton>
                        ) : (
                            <StyledButton>
                                <StyledBsMoon />
                                    <NavText open={open}>Modo Oscuro</NavText>
                            </StyledButton>
                        )}
                    </ModoOscuro>
                </BottomContent>
            </MenuBar>
        </SideBar>
    );
};

export default Navbar;
