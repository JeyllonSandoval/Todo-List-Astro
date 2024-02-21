import { API_URL } from "@/services/API";

export const createTask = async (title: string, description: string) => {
    const response = await fetch(API_URL + '/create', {
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