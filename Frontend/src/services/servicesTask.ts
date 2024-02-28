import { API_URL } from '@/services/API';
import type { Task } from '@/types/Task';

export const fetchTasks = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error("Error al obtener las tareas");
    }
    return response.json();
};


export const createTask = async (title: string, description: string) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({title, description})
    });

    if (!response.ok) {
        throw new Error("Error al guardar la tarea");
    }

    return response.json();
};

async function deleteTaskFecth(id: string) {
    const response = await fetch(API_URL + `/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Error al borrar la tarea");
    }

    return response.json();
  }
export default deleteTaskFecth;

export const updateTask = async (task: Task) => {
    const response = await fetch(API_URL + `/${task._id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task)
    });

    if (!response.ok) {
        throw new Error("Error al actualizar la tarea");
    }

    return response.json();
};

export const removeAllTasksFetch = async () => {
    const response = await fetch(API_URL, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Error al borrar las tareas");
    }

    return response.json();
};
