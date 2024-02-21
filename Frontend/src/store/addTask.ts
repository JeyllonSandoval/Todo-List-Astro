import { create } from 'zustand';

type Task = {
  title: string;
  description: string;
};

type Action = {
  updateTitle: (title: Task['title']) => void;
  updateDescription: (description: Task['description']) => void;
}

export const useActions = create<Task & Action> ((set) => ({
  title: '',
  description: '',
  updateTitle: (title) => set(()=> ({title: title})),
  updateDescription: (description) => set(()=> ({description: description})),
}));
