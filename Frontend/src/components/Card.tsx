
import { fetchTasks } from "@/services/servicesTask";
import deleteTaskFecth  from "@/services/servicesTask";
import useTaskStore from "@/store/useTaskStore";
import React, { useEffect } from "react";
import { cssTransition, toast } from 'react-toastify';
import type { Task } from "@/types/Task";

export default function Card() {

  const {tasks, setTasks, removeTask, task, setTask} = useTaskStore((state) => state);
  //const setTasks = useTaskStore((state) => state.setTasks);
  async function deleteTask(id: string) {
    const taskDeleted = await toast.promise(deleteTaskFecth(id), {
      pending: 'Deleting task...',
      success: 'Task completed!',
      error: 'Error deleting task'
    });
    if (!taskDeleted) return console.log("Error deleting task");
    removeTask(taskDeleted._id);
  }

  async function updateTask(task: Task) {
    setTask(task);
  }

  useEffect(() => {

    fetchTasks()
    .then((tasks) => {
      setTasks(tasks);
    });
  }, []);

return (
<section className="flex flex-col gap-4">
  {
    tasks.map((task) => (
      <article className="flex justify-center items-start">
        <div className="flex gap-1 justify-between p-2 list-none bg-slate-900 rounded-lg text-white border-2 border-slate-500 w-1/2 max-sm:w-72">
          <div className="flex flex-col">
            <h2 className="text-xl">{task.title}</h2>
            <p className="text-xl text-slate-400">{task.description}</p>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <button onClick={()=>{deleteTask(task._id)}}
            className="rounded-lg bg-green-700 p-1">
              Complete
            </button>
            <button onClick={()=>{updateTask(task)}}
              className="rounded-lg bg-blue-700 p-1">
              Edit
            </button>
          </div>
        </div>
      </article>
    ))
  }
</section>
)}