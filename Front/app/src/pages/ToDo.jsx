import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { CONFIG } from "../utils";

import styled, { css } from "styled-components";



// Función para eliminar un task
const eliminateTask = async (index, authTokens, task, setTask) => {
    const url = CONFIG.API_URL + "/api/tasks/delete/" + String(index) + "/";
    let response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
        },
    });
    let data = await response.json();
    if (response.status === 200) {
        let filteredArray = task.filter((value, i) => value.id !== index);
        setTask(filteredArray);
    }
};

// Función para editar el contenido de una task
const updateTask = async (id,authTokens,newBody) => {
    const url = CONFIG.API_URL + "/api/tasks/edit/" + String(id) + "/";
    let response = await fetch(url, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
        },
        body: JSON.stringify({"data":newBody})
    });
    let data = await response.json();
    if (response.status === 200) {

    } else {
        alert("Ocurrió un problema al actualizar el contenido")
    }
};


// Componente para añadir un Task
const AddTaskForm = ({ authTokens, setTask }) => {
    const AddTask = async (e) => {
        e.preventDefault();
        const url = CONFIG.API_URL + "/api/tasks/create";
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + String(authTokens.access),
            },
            body: JSON.stringify({
                Contenido: e.target.Texto.value,
            }),
        });
        let data = await response.json();
        if (response.status === 200) {
            setTask((prevState) => [...prevState, data.data]);
        }
    };

    return (
        <form onSubmit={AddTask}>
            <input type="text" name="Texto" placeholder="Contenido..." />
            <input type="submit" />
        </form>
    );
};

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

    const updateStateTask = (e,index) => {
        task[index].body = e.target.value
        setTask(task)
    }
    return (
        <div>
            ToDo List
            <AddTaskForm authTokens={authTokens} setTask={setTask} />
            <ul>
                {task.map((value, index) => {
                    return (
                        <li key={value.id}>
                            <input type="text" defaultValue={value.body} onChange={(e) => updateStateTask(e,index)}/>
                            <span onClick={() => eliminateTask(value.id, authTokens, task, setTask)}> Eliminar</span>
                            <span onClick={() => updateTask(value.id, authTokens, task[index].body)}> Editar</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ToDo;
