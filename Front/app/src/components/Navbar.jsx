import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import SideBarContext from "../contexts/SideBarContext";
import styled from "styled-components";
import {  FaHome, FaChevronRight, FaListUl, FaChevronLeft } from "react-icons/fa";
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
    Crea su elemento de React
*/
// const StyledLink = ({ children, ...info }) => {
//     return <StyledLink {...info}>{children}</StyledLink>;
// };

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
`;

/* 
    Logo con la imagen y texto del nav
*/
const Logo = styled.div`
    display: flex;
    align-items: center;
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
// const HeaderText = styled.div`
//     font-size: 24px;
//     font-weight: 700;
//     display: flex;
//     flex-direction: column;
// `;

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

// const Menu = styled.div``;

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
        background: #a86464;
        color: white;
    }
`;

/* 
    Toggler de la sidebar
*/
const StyledFaChevronRight = ({ open, onClick }) => {
    return (
        <>
        {!open ? <FaChevronRightContainer onClick={onClick}>
            <FaChevronRight size={20}></FaChevronRight>
        </FaChevronRightContainer> :
        <FaChevronRightContainer onClick={onClick}>
            <FaChevronLeft size={20}></FaChevronLeft>
        </FaChevronRightContainer>
        
        }
        </>
    );
};

/* 
   Container del toggler de la sidebar
*/
const FaChevronRightContainer = styled.div`
    position: absolute;
    top: 50%;
    right: -35px;
    transform: translateY(-50%);
    height: 35px;
    width: 35px;
    background: #b3e5be;
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
`;

/*
    Icon app de la sidebar
*/
const TaskIcon = ({ Icon }) => {
    const StyledIcon = styled(Icon)`
        min-width: 60px;
        font-size: 20px;
        color: inherit;
    `;

    return <StyledIcon></StyledIcon>;
};

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
const ModoOscuro = styled.div`
    height: 50px;
    margin-top: 10px;
    list-style: none;
    display: flex;
    align-items: center;
    border-radius: 10px;
    transition: all 0.4s ease;
    cursor: pointer;

    :hover {
        background: darkgray;
        color: white;
    }
`;

/*
    Texto para el contenido del modo oscuro
*/
const StyledText = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
    color: inherit;
    font-size: 24px;
    transition: all 0.2s ease;
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
                                <TaskIcon Icon={FaListUl} />
                                <NavText open={open}>Tareas s</NavText>
                            </StyledLink>
                        </NavLink>

                        <NavLink>
                            <StyledLink to="/tareas">
                                <TaskIcon Icon={FaListUl} />
                                <NavText open={open}>Tareas 2</NavText>
                            </StyledLink>
                        </NavLink>

                        <NavLink>
                            <StyledLink to="/tareas">
                                <TaskIcon Icon={FaListUl} />
                                <NavText open={open}>Tareas s</NavText>
                            </StyledLink>
                        </NavLink>
                    </MenuLinks>
                <BottomContent>
                    <Logout>
                        {auth ? <StyledLink to="/">
                            <TaskIcon Icon={BiLogOut} />
                            <NavText onClick={logoutUser} open={open}>
                                Cerrar Sesión
                            </NavText>
                        </StyledLink> :
                        <StyledLink to="/login">
                                <TaskIcon Icon={VscAccount} />
                                <NavText open={open}>Iniciar Sesión</NavText>
                            </StyledLink>
                        }
                    </Logout>
                    <ModoOscuro>
                        {darkMode ? (
                            <>
                                <TaskIcon Icon={FiSun} />
                                <NavText>
                                    <StyledText open={open}>Modo Claro</StyledText>
                                </NavText>
                            </>
                        ) : (
                            <>
                                <TaskIcon Icon={BsMoon} />
                                <StyledText>
                                    <NavText open={open}>Modo Oscuro</NavText>
                                </StyledText>
                            </>
                        )}
                    </ModoOscuro>
                </BottomContent>
            </MenuBar>
        </SideBar>
    );
};

export default Navbar;
