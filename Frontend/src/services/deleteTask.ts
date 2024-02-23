import { API_URL } from "@/services/API";

async function deleteTaskFecth(id: string) {
    const response = await fetch(API_URL + `/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  }

export default deleteTaskFecth;