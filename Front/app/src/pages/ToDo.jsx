import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { CONFIG } from "../utils";
import styled from "styled-components";
import LoadingRing from "../components/Loading";

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
const updateTask = async (id, authTokens, newBody, checked) => {
    const url = CONFIG.API_URL + "/api/tasks/edit/" + String(id) + "/";
    let response = await fetch(url, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
        },
        body: JSON.stringify({ data: newBody, checked: checked }),
    });
    let data = await response.json();
    if (response.status === 200) {
    } else {
        console.log(response);
        alert("Ocurrió un problema al actualizar el contenido");
    }
};

const AddForm = styled.form`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const AddButton = styled.input`
    width: 100px;
    height: 50px;
    border-radius: 20px;
    font-size: 20px;
    background: var(--color-submit);
    cursor: pointer;
    color: var(--color-component);
    border: 1px var(--color-contrastText) solid;
`

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
        <AddForm onSubmit={AddTask}>
            <TaskInput type="text" name="Texto" placeholder="Nombre..." />
            <AddButton type="submit" name="Añadir" />
        </AddForm>
    );
};

const ContentWrapper = styled.div`
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s ease;
`;

const StyleTasks = styled.div`
    background-color: var(--color-component);
    border: 2px solid var(--color-border);
    padding: 30px;
    justify-content: center;
    border-radius: 10%;
    width: 60%;
    min-width: 300px;
    max-width: 1000px;
    min-height: max(500px, 80%);
    height: auto;
    transition: all 0.5s ease;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Title = styled.h1`
    font-size: 40px;
    font-weight: 1000;
    display: flex;
    justify-content: center;
`;

const TaskList = styled.ul`
    list-style-type: none;
    width: 100%;
`;

const TaskItem = styled.li`
    display: flex;
    align-items: center;
    margin: 20px;
    border-radius: 10px;
    width: 100%;

`;

const TaskInput = styled.input`
    background: var(--color-body);
    border: var(--color-contrastText);
    color: inherit;
    font-size: inherit;
    padding: 10px;
    margin: 10px;
    width: 100%;
    border-radius: 10px;
`;

const Buttons = styled.div`
    display: flex;
`;

const EditButton = styled.span`
    cursor: pointer;
    background: var(--color-edit);
    width: 90px;
    height: 50px;
    border-radius: 5px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    border: 1px var(--color-contrastText) solid;
`;

const DeleteButton = styled(EditButton)`
    background: var(--color-delete);
`;

const CheckContainer = styled.div`
    border: 1px solid var(--color-contrastText);
    background-color: var(--color-component);
    width: 25px;
    min-width: 25px;
    height: 25px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
`;

const CheckItem = styled.div`
    width: 15px;
    height: 15px;
    border-radius: 3px;
    background-color: ${(props) => (props.checked ? "var(--color-hover2)" : "inherit")};
`;


const TopContent = styled.div`
`

/* 
    Página de Tareas
*/
const ToDo = ({}) => {
    const [task, setTask] = useState([]);
    // Obtiene los JWT del contexto
    let { authTokens } = useContext(AuthContext);

    const [loading, setLoading] = useState(true)
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
        setLoading(false)
    };

    const updateStateTask = (e, index) => {
        task[index].body = e.target.value;
        setTask(task);
    };
    const updateChecked = (index) => {
        let NewTask = [...task];
        NewTask[index].checked = !NewTask[index].checked;
        setTask(NewTask);
    };
    
    return (
        <ContentWrapper>
            <StyleTasks id="HOLA">
            {loading ? <LoadingRing size={200} color={"red"} /> :
                <>
                {/* <LoadingRing size={120} color="red" /> */}
                <TopContent>
                <Title>Tareas</Title>
                <TaskList>
                    {task.map((value, index) => {
                        return (
                            <TaskItem key={value.id}>
                                <CheckContainer
                                    onClick={() => {
                                        updateChecked(index);
                                    }}
                                >
                                    <CheckItem checked={task[index].checked} />
                                </CheckContainer>
                                <TaskInput type="text" defaultValue={value.body} onChange={(e) => updateStateTask(e, index)} />
                                <Buttons>
                                    <EditButton onClick={() => updateTask(value.id, authTokens, task[index].body, task[index].checked)}>
                                        {"Editar"}
                                    </EditButton>
                                    <DeleteButton onClick={() => eliminateTask(value.id, authTokens, task, setTask)}>
                                        {"Eliminar"}
                                    </DeleteButton>
                                </Buttons>
                            </TaskItem>
                        );
                    })}
                </TaskList>
                </TopContent>

                <AddTaskForm authTokens={authTokens} setTask={setTask} />
                </>

            }
                    
            </StyleTasks>
        </ContentWrapper>
    );
};

export default ToDo;
