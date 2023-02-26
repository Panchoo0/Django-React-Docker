import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const Navbar = () => {
    let { auth, logoutUser } = useContext(AuthContext);
    return (
        <div>
            <Link to="/">Inicio</Link>
            <span> / </span>
            {auth ? (
                <>
                    <Link to="/tareas">Tareas</Link>
                    <span> / </span>
                    <span onClick={logoutUser}>Cerrar Sesión</span>
                </>
            ) : (
                <Link to="/login">Iniciar Sesión</Link>
            )}
        </div>
    );
};

export default Navbar;
