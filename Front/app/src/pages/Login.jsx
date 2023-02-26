import React, { useContext, useState } from "react";
import styled from "styled-components";
import AuthContext from "../contexts/AuthContext";

const FormDiv = styled.div``;

const SelectLogin = styled.div`
    size: 20px;
`;


/* 
    Página de Login
*/
const Login = () => {
    // Función para logear al usuario
    let { loginUser, signinUser } = useContext(AuthContext);

    const [createAcount, setCreateAcount] = useState(false);

    return (
        <FormDiv>
            <SelectLogin onClick={() => setCreateAcount(true)}>Crear Usuario</SelectLogin>
            <SelectLogin onClick={() => setCreateAcount(false)}>Iniciar Sesión</SelectLogin>
            <form onSubmit={createAcount ? signinUser : loginUser}>
                <input type="text" name="username" placeholder="Nombre de Usuario" />
                <input type="password" name="password" placeholder="Contraseña" />
                <input type="submit" />
            </form>
        </FormDiv>
    );
};

export default Login;
