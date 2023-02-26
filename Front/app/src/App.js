import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToDo, HomePage, Login } from "./pages";
import { Navbar } from "./components";
import { PrivateRoute } from "./utils";
import { AuthProvider } from "./contexts/AuthContext";

//rafce
//imd

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Navbar></Navbar>
                <Routes>
                    <Route element={<HomePage />} path="/" exact />
                    <Route element={<Login />} path="/login" />
                    <Route element={<PrivateRoute component={<ToDo />} />} path="/tareas" />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
