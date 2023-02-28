import { createContext, useState, useEffect } from "react";
import { CONFIG } from "../utils/config";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;
/* 
    Provee la Autenticación a cada componente que la requiera
*/
export const AuthProvider = ({ children }) => {
    // JWT. Los obtiene del localStorage
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null
    );
    // Booleano: True: Está autenticado
    const [auth, setAuth] = useState(() => (localStorage.getItem("authTokens") ? true : false));
    // Redirecciona a otra parte
    const navigate = useNavigate();
    // Booleano que indica si se está cargando la página
    const [loading, setLoading] = useState(true);

    // Crea al usuario en el backend
    const signinUser = async (e, setError) => {
        e.preventDefault();
        let newErrors = [];
        if (e.target.password.value === "") {
            newErrors.push("La contraseña es obligatoria");
        }
        if (e.target.username.value === "") {
            newErrors.push("El nombre de usuario es obligatorio");
        }
        if (e.target.password.value !== e.target.password2.value) {
            newErrors.push("Las contraseñas no coinciden");
        }
        if (newErrors.length !== 0) {
            setError(newErrors);
            return;
        }
        const url = CONFIG.API_URL + "/create_user";
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: e.target.username.value,
                password: e.target.password.value,
            }),
        });
        let data = await response.json();
        if (response.status === 200) {
            setAuthTokens(data);
            setAuth(true);
            localStorage.setItem("authTokens", JSON.stringify(data));
            navigate("/");
        } else if (response.status === 409) {
            newErrors.push("El nombre de usuario se encuentra en uso");
            setError(newErrors);
            return;
        }
    };

    // Logea al usuario en el backend y obtiene los JWT
    const loginUser = async (e, setError) => {
        e.preventDefault();
        let newErrors = [];
        if (e.target.password.value === "") {
            newErrors.push("La contraseña es obligatoria");
        }
        if (e.target.username.value === "") {
            newErrors.push("El nombre de usuario es obligatorio");
        }
        if (newErrors.length !== 0) {
            setError(newErrors);
            return;
        }

        const url = CONFIG.API_URL + "/api/token/";
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: e.target.username.value,
                password: e.target.password.value,
            }),
        });

        let data = await response.json();
        if (response.status === 200) {
            setAuthTokens(data);
            setAuth(true);
            localStorage.setItem("authTokens", JSON.stringify(data));
            navigate("/");
        } else {
            newErrors.push("Credenciales Inválidas")
            setError(newErrors)
        }
    };

    // Desloguea al usuario del backend
    const logoutUser = async () => {
        const url = CONFIG.API_URL + "/logout";
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + String(authTokens.access),
            },
            body: JSON.stringify({
                refresh: authTokens?.refresh,
            }),
        });
        setAuthTokens(null);
        setAuth(false);
        localStorage.removeItem("authTokens");
        navigate("/");
    };

    // Refresca el token de acceso
    const updateToken = async () => {
        const url = CONFIG.API_URL + "/api/token/refresh/";
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refresh: authTokens?.refresh,
            }),
        });
        let data = await response.json();
        if (response.status === 200) {
            setAuthTokens(data);
            setAuth(true);
            data["refresh"] = authTokens.refresh;
            localStorage.setItem("authTokens", JSON.stringify(data));
        } else {
            logoutUser();
        }

        setLoading(false);
    };

    // Refresca el token de acceso cada 14 minutos
    useEffect(() => {
        if (loading) {
            updateToken();
        }

        const refreshTime = 14 * 60 * 1000;
        let interval = setInterval(() => {
            if (authTokens) {
                updateToken();
            }
        }, refreshTime);
        return () => clearInterval(interval);
    }, [authTokens, loading]);

    // Valores provistos por el contexto
    let contextData = {
        auth: auth,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
        signinUser: signinUser,
    };
    return <AuthContext.Provider value={contextData}>{loading ? null : children}</AuthContext.Provider>;
};
