import { createTask } from "@/services/servicesTask";
import { removeAllTasksFetch } from "@/services/servicesTask";
import useTaskStore from "@/store/useTaskStore";
import type { Task } from "@/types/Task";
import { toast } from 'react-toastify';

export default function Form() {

    const {addTask, task, setTask, updateTask, removeAllTasks} = useTaskStore((state) => state);

    // const addTask = useTaskStore((state) => state.addTask);
    // const task = useTaskStore((state) => state.task);
    // const setTask = useTaskStore((state) => state.setTask);
    // const updateTask = useTaskStore((state) => state.updateTask);
    // const removeAllTasks = useTaskStore((state) => state.removeAllTasks);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const data: any = Object.fromEntries(form.entries());

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

    async function deleteAllTasks(){
        const taskDeleted = await toast.promise(removeAllTasksFetch(), {
            pending: 'Deleting all tasks...',
            success: 'All tasks removed!',
            error: 'Error deleting all tasks'
        });
        if (!taskDeleted) return console.log("Error deleting all tasks");
        removeAllTasks();
    }

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
                    className="resize-none placeholder-white text-slate-100 bg-slate-600 h-36 py-1 px-2 rounded-lg w-1/2 max-sm:w-72"
                    name="description"
                    defaultValue={task?.description || ""}
                ></textarea>
                <div className="flex w-2/3 justify-center items-center gap-2">
                    <button
                        onClick={deleteAllTasks}
                        type="reset"
                        className="hover:bg-red-700 hover:text-white hover:border-white bg-red-900 rounded-lg text-white py-1 border-2 border-slate-400 w-1/3 min-w-24"
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        className="hover:bg-green-700 hover:text-white hover:border-white bg-green-800 rounded-lg text-white py-1 border-2 border-slate-400 w-1/3 min-w-40"
                    >
                        {task ? "Completed Edit" : "Add"}
                    </button>
                </div>
            </form>
        </section>
    );
}