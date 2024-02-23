import { create } from 'zustand';
import type { Task } from '@/types/Task';

type TaskState = {
    tasks: Task[];
    task: Task;
    setTask: (task: Task) => void;
    addTask: (task: Task) => void;
    updateTask: (task: Task) => void;
    setTasks: (tasks: Task[]) => void;
    removeTask: (id: string) => void;
};

const useTaskStore = create<TaskState>((set) => ({
    tasks: [],
    task: null,
    setTask: (task) => set({ task }),
    addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
    updateTask: (task) =>
        set((state) => ({
            tasks: state.tasks.map((t) => (t._id === task._id ? task : t)),
        })),
    setTasks: (tasks) => set({ tasks }),
    removeTask: (id) =>
        set((state) => ({
            tasks: state.tasks.filter((task) => task._id !== id),
        })),
}));

export default useTaskStore;