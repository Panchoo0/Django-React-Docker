import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToDo, HomePage, Login } from "./pages";
import { PrivateRoute } from "./utils";
import { AnonymousRoute } from "./utils";
import { AuthProvider } from "./contexts/AuthContext";
import { SideBarProvider } from "./contexts/SideBarContext";
import styled from "styled-components";
import LoadingRing from "./components/Loading";
//rafce
//imd

const Root = styled.div`
    /* font-family: 'Open Sans', sans-serif; */
    display: flex;
    height: 100%;
`;

function App() {

    return (
        <Root>
            <SideBarProvider>
                <BrowserRouter>
                    <AuthProvider>
                        <Routes>
                            <Route element={<AnonymousRoute navBar={true} component={<HomePage />} />} path="/" exact />
                            <Route element={<AnonymousRoute navBar={false} component={<LoadingRing />} />} path="/l" exact />
                            <Route element={<AnonymousRoute navBar={false} component={<Login />} />} path="/login" exact/>
                            <Route element={<PrivateRoute component={<ToDo />} />} path="/tareas" />
                        </Routes>
                    </AuthProvider>
                </BrowserRouter>
            </SideBarProvider>
        </Root>
    );
}

export default App;
