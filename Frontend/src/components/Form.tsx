import { createTask } from "@/services/createTask";
import { useActions } from "@/store/addTask";
import React, { useState } from "react";

export default function Form() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setTitle('');
        setDescription('');

        createTask(title, description)
        .catch(err => console.error(err));
    };

    return (
        <section className="h-64 flex-1 flex justify-center items-start">
            <form onSubmit={handleSubmit} className="w-screen flex flex-col justify-center items-center gap-4">
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Title"
                    className="placeholder-white text-slate-100 bg-slate-600 py-1 px-2 rounded-lg w-1/2 max-sm:w-72"
                />
                <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Description"
                    className="placeholder-white text-slate-100 bg-slate-600 h-36 py-1 px-2 rounded-lg w-1/2 max-sm:w-72"
                ></textarea>
                <button
                    type="submit"
                    className="hover:bg-white hover:text-black hover:border-sky-700 bg-slate-800 rounded-lg text-white py-1 border-2 border-slate-400 w-1/3"
                >
                    Add
                </button>
            </form>
        </section>
    );
}