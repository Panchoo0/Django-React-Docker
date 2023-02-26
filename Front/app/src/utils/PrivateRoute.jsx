import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const PrivateRoute = ({ component }) => {
    let { auth } = useContext(AuthContext);

    return auth ? component : <Navigate to="/login" />;
};

export default PrivateRoute;
