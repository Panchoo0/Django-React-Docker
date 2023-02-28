import { useContext } from "react";
import SideBarContext from "../contexts/SideBarContext";
import ContentWrapperNavbar, {ContentWrapper} from "../components/Global/ContentWrapper";
import { Navbar } from "../components";
import { GlobalStyles } from "../components/Global/CSSVariables"

const AnonymousRoute = ({ component, navBar }) => {
    let { open } = useContext(SideBarContext);

    return (
        <>  
        <GlobalStyles open={open}/>
            {navBar ? (
                <>
                    <Navbar></Navbar>
                    <ContentWrapperNavbar open={open}>{component}</ContentWrapperNavbar>
                </>
            ) : (
                <ContentWrapper open={open}>{component}</ContentWrapper>
            )}
        </>
    );
};

export default AnonymousRoute;
