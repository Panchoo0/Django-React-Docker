import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { CONFIG } from "../utils";

/* 
    Página de ToDo
*/
const ToDo = () => {
    const [task, setTask] = useState([]);
    // Obtiene los JWT del contexto
    let { authTokens } = useContext(AuthContext);

    // Obtiene las tareas del usuario
    useEffect(() => {
        getList();
    }, []);
    const getList = async () => {
        const url = CONFIG.API_URL + "/api/tasks/";
        let response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + String(authTokens.access),
            },
        });
        let data = await response.json();
        if (response.status === 200) {
            setTask(data);
        }
    };

    return (
        <div>
            ToDo List
            <ul>
                {task.map((value, index) => (
                    <li key={value.id}>{value.body}</li>
                ))}
            </ul>
        </div>
    );
};

export default ToDo;
