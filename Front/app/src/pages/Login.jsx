import React, { useContext, useState } from "react";
import styled from "styled-components";
import AuthContext from "../contexts/AuthContext";
import { MdAccountCircle } from "react-icons/md";


const Container = styled.div`
    width: 100%;
    max-height: 650px;
    max-width: 550px;
    height: auto;
    background-color: var(--color-sage);
    justify-content: center;
    display: flex;
    border-radius: 10px;
    box-shadow: 15px 25px 35px var(--color-text), -15px 25px 35px var(--color-text);
    padding-bottom: 50px;

`;

const LoginCircle = styled.div`
    border-radius: 50%;
    width: 155px;
    height: 155px;
    transform: translateY(-50%);
    position: absolute;
    background-color: var(--color-sage);
    /* z-index: 5; */
    border: solid;
    border-width: 5px;
    border-color: var(--color-text);
`;

const LoginImage = styled(MdAccountCircle)`
    width: 100%;
    height: 100%;
`;

const LogForm = styled.div`
    margin-top: 100px;
    width: 80%;
`;

const TabLogin = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    /* padding: 0% 10%; */
`;

const Tab = styled.p`
    line-height: 150%;
    display: inline-flex;
    width: 45%;
    justify-content: center;
    color: ${props => props.selected ? "white" : "inherit"};
    /* border-radius: 40% 40% 0% 0%; */
    min-height: 50px;
    height: auto;
    /* padding: auto; */
    cursor: pointer;
    box-sizing: border-box;
    background-color: ${(props) => (props.selected ? "var(--color-natuer)" : "inherit")};
    :hover {
        outline: solid 5px var(--color-text);
        transition: all 0.05s ease;
    }

    @media screen and (max-width: 500px){
        font-size: 20px;
        line-height: 200%;
        min-height: 35px;
    }
`;

const BreakLine = styled.div`
    width: 100%;
    height: 3px;
    background-color: var(--color-text);
    margin: 10px auto;
`;




const Input = styled.input`
    display: block;
    width: 100%;
    background: var(--color-sage);
    border: solid;
    border-width: 3px;
    border-color: ${ (props) => ! props.errors ? "var(--color-text)" : "red"};
    height: 50px;
    border-radius: 10px;
    padding-left: 30px;
    padding-right: 30px;

    :focus, :hover {
        background: white;
    }

`;
const InputLabel = styled.label`
    font-size: 16px;
    padding-left: 30px;
`;

const StyleInput = styled.div`
    width: 100%;
    justify-content: center;
    margin-top: 5px;
`;

const FormInput = ({ inputLabel, inputID, type="text"}) => {
    return (
        <StyleInput>
            <InputLabel htmlFor={inputID}> {inputLabel} </InputLabel>
            <Input type={type} id={inputID} error={false}/>
        </StyleInput>
    );
};

const StyleForm = styled.form`
    justify-content: center;
    width: 100%;
    
`;


const SubmitContainer = styled.div`
    margin-top: 50px;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
`


const StyleSubmit = styled.input`
    min-width: 150px;
    width: 50%;
    height: 100%;
    justify-content: center;
    font-size: 24px;
    background: var(--color-natuer);
    border: solid;
    border-width: 3px;
    border-color: var(--color-text);
    border-radius: 10px;
    cursor: pointer;
`

const Submit = ({value}) => {
    return (
        <SubmitContainer>
            <StyleSubmit type="submit" value={value}/>
        </SubmitContainer>
    )
}

const ErrorList = styled.ul`
    list-style: none;
    position: relative;
    top: 15px;
`

const ErrorItem = styled.li`
    font-size: 16px;
    color: red;
    padding: 5px 0px;

    :last-child {
        padding: 0px;
    }
`

const GenerateErrorList = ({error}) => {
    return (
        <ErrorList>
            {error.map( (value) => (
                <ErrorItem>
                    {value}
                </ErrorItem>
            ))}
        </ErrorList>

    )
}


const LoginForm = ({ onSubmit,error }) => {
    return (
        <StyleForm onSubmit={onSubmit}>
            <FormInput inputLabel={"Nombre de Usuario"} inputID="username" />
            <FormInput inputLabel={"Contraseña"} inputID="password" type="password" />
            <GenerateErrorList error={error}/>
            <Submit value="Iniciar Sesión"/>
        </StyleForm>
    );
};

const SigninForm = ({ onSubmit,error }) => {
    return (
        <StyleForm onSubmit={onSubmit}>
            <FormInput inputLabel={"Nombre de Usuario"} inputID="username" />
            <FormInput inputLabel={"Contraseña"} inputID="password" type="password" />
            <FormInput inputLabel={"Reingrese la Contraseña"} inputID="password2" type="password" />
            <GenerateErrorList error={error}/>
            <Submit value="Crear Usuario"/>
        </StyleForm>
    );
};


/* 
    Página de Login
*/
const Login = () => {
    // Función para logear al usuario
    let { loginUser, signinUser } = useContext(AuthContext);

    const [isLoginForm, setIsLoginForm] = useState(true)
    const [error, setError] = useState([])
    console.log(error);

    return (

        <>
            <Container>
                <LoginCircle>
                    <LoginImage />
                </LoginCircle>

                <LogForm>
                    <TabLogin>
                        <Tab selected={isLoginForm} onClick={()=> {setIsLoginForm(true); setError([]) }}>Iniciar Sesión</Tab>
                        <Tab selected={!isLoginForm} onClick={()=> {setIsLoginForm(false); setError([]) }}>Crear Cuenta</Tab>
                    </TabLogin>
                    <BreakLine />
                    {isLoginForm ? <LoginForm error={error} onSubmit={(e) => loginUser(e,setError)}/> : <SigninForm error={error} onSubmit={(e)=>signinUser(e,setError)}/>}
                </LogForm>
            </Container>
        </>
    );
};

export default Login;
