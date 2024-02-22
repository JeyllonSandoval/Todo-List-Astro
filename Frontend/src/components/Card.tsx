
import { fetchTasks } from "@/services/getTask";
import type { Task } from "@/types/Task";
import useTaskStore from "@/store/useTaskStore";
import React, { useEffect } from "react";



export default function Card() {

  const {tasks, setTasks} = useTaskStore((state) => state);
  //const setTasks = useTaskStore((state) => state.setTasks);


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
