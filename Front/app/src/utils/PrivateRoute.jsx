import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import SideBarContext from "../contexts/SideBarContext";
import { Navbar } from "../components";
import ContentWrapperNavbar from "../components/Global/ContentWrapper";
import { GlobalStyles } from "../components/Global/CSSVariables"

const PrivateRoute = ({ component }) => {
    let { auth } = useContext(AuthContext);
    let { open, darkMode } = useContext(SideBarContext);

    return (
        <>
            <GlobalStyles darkMode={darkMode} />
            {auth ? (
                <>
                    <Navbar></Navbar>
                    <ContentWrapperNavbar open={open}>{component}</ContentWrapperNavbar>
                </>
            ) : (
                <Navigate to="/" />
            )}
        </>
    );
};

export default PrivateRoute;
