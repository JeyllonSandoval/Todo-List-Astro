
import { fetchTasks } from "@/services/getTask";
import deleteTaskFecth  from "@/services/deleteTask";
import useTaskStore from "@/store/useTaskStore";
import React, { useEffect } from "react";
import { toast } from 'react-toastify';
import type { Task } from "@/types/Task";

export default function Card() {

  const {tasks, setTasks, removeTask, task, setTask} = useTaskStore((state) => state);
  //const setTasks = useTaskStore((state) => state.setTasks);
  async function deleteTask(id: string) {
    const taskDeleted = await toast.promise(deleteTaskFecth(id), {
      pending: 'Deleting task...',
      success: 'Task deleted',
      error: 'Error deleting task'
    });
    if (!taskDeleted) return console.log("Error deleting task");
    removeTask(taskDeleted._id);
    console.log('Task deleted');
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
        <div  className="px-2 list-none bg-slate-900 rounded-lg text-white py-1 border-2 border-slate-500 w-1/2 max-sm:w-72">
          <a href={`/${task._id}`}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
          </a>

          <button onClick={()=>{
            deleteTask(task._id);
          }}>
            delete
          </button>
          <button onClick={
            ()=>{
              updateTask(task);
            }
          
          }>
            edit
          </button>
        </div>
      </article>
    ))
  }
</section>
)}

// import React from 'react';
// import useAddTask from '@/store/addTask';

// const Card: React.FC = () => {
//   const tasks = useAddTask((state) => state.tasks);

//   return (
//     <section className="flex flex-col gap-4">
//       {tasks.map((task, index) => (
//         <article key={index} className="flex justify-center items-start">
//           <div className="px-2 list-none bg-slate-900 rounded-lg text-white py-1 border-2 border-slate-500 w-1/2 max-sm:w-72">
//             <h2>{task.title}</h2>
//             <p>{task.description}</p>
//           </div>
//         </article>
//       ))}
//     </section>
//   );
// };

// export default Card;
