import { createTask } from "@/services/createTask";

import useTaskStore from "@/store/useTaskStore";
import React, { useState } from "react";
import type { Task } from "@/types/Task";
import { toast } from 'react-toastify';

export default function Form() {

    const addTask = useTaskStore((state) => state.addTask);
    const task = useTaskStore((state) => state.task);
    const setTask = useTaskStore((state) => state.setTask);
    const updateTask = useTaskStore((state) => state.updateTask);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const data: any = Object.fromEntries(form.entries());
        console.log(data);


        const { title, description } = data as Task;
        if (task){
            const updatedTask = {...task, title, description};
            updateTask(updatedTask);
            toast.success('Task updated');
            setTask(null);
        }else{
            const newtask = await createTask(title, description)
    
            addTask(newtask);
            toast.success('Task added');
        }
        e.target.reset();
    };

    return (
        <section className="h-64 flex-1 flex justify-center items-start">
            <form onSubmit={handleSubmit} className="w-screen flex flex-col justify-center items-center gap-4">
                <input
                    type="text"
                    placeholder="Title"
                    className="placeholder-white text-slate-100 bg-slate-600 py-1 px-2 rounded-lg w-1/2 max-sm:w-72"
                    name="title"
                    defaultValue={task?.title}
                />
                <textarea
                    placeholder="Description"
                    className="placeholder-white text-slate-100 bg-slate-600 h-36 py-1 px-2 rounded-lg w-1/2 max-sm:w-72"
                    name="description"
                    defaultValue={task?.description || ""}
                ></textarea>
                <button
                    type="submit"
                    className="hover:bg-white hover:text-black hover:border-sky-700 bg-slate-800 rounded-lg text-white py-1 border-2 border-slate-400 w-1/3"
                >
                    {task ? "Edit" : "Add"}
                </button>
            </form>
        </section>
    );
}