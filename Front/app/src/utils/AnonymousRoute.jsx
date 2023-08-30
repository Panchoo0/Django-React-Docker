import { useContext } from "react";
import SideBarContext from "../contexts/SideBarContext";
import ContentWrapperNavbar, {ContentWrapper} from "../components/Global/ContentWrapper";
import { Navbar } from "../components";
import { GlobalStyles } from "../components/Global/CSSVariables"

const AnonymousRoute = ({ component, navBar }) => {
    let { open, darkMode } = useContext(SideBarContext);
    console.log(darkMode)
    return (
        <>  
        <GlobalStyles darkMode={darkMode}/>
            {navBar ? (
                <>
                    <Navbar></Navbar>
                    <ContentWrapperNavbar open={open}>{component}</ContentWrapperNavbar>
                </>
            ) : (
                <ContentWrapper >{component}</ContentWrapper>
            )}
        </>
    );
};

export default AnonymousRoute;
