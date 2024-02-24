/* empty css                          */
import { e as createAstro, f as createComponent, r as renderTemplate, h as addAttribute, i as renderHead, j as renderSlot, k as renderComponent, m as maybeRenderHead } from '../astro_DlAyKSjh.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import 'cssesc';
import { ToastContainer, toast } from 'react-toastify';
import { jsx, jsxs } from 'react/jsx-runtime';
import { create } from 'zustand';
import { useEffect } from 'react';

const $$Astro$2 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "ToastContainer", ToastContainer, { "position": "bottom-right", "autoClose": 5e3, "hideProgressBar": false, "newestOnTop": false, "closeOnClick": true, "rtl": false, "pauseOnFocusLoss": true, "draggable": true, "pauseOnHover": true, "theme": "dark", "transition:Bounce,": true, "client:load": true, "client:component-hydration": "load", "client:component-path": "react-toastify", "client:component-export": "ToastContainer" })} </body></html>`;
}, "/home/jeyllon/projects/Todo-List-Astro/Frontend/src/layouts/Layout.astro", void 0);

const $$Astro$1 = createAstro();
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Header;
  const { title, description } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<header class="py-4 px-2 mx-auto max-w-xl lg:py-8 lg:px-6 text-center"> <h1 class="text-4xl font-bold leading-tight text-white lg:text-5xl"> ${title} </h1> <p class="mt-4 text-lg text-gray-400"> ${description} </p> </header>`;
}, "/home/jeyllon/projects/Todo-List-Astro/Frontend/src/components/Header.astro", void 0);

const API_URL = "http://localhost:8322";

const createTask = async (title, description) => {
  const response = await fetch(API_URL + "/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, description })
  });
  if (!response.ok) {
    throw new Error("Error al guardar la tarea");
  }
  return response.json();
};

const useTaskStore = create((set) => ({
  tasks: [],
  task: null,
  setTask: (task) => set({ task }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (task) => set((state) => ({
    tasks: state.tasks.map((t) => t._id === task._id ? task : t)
  })),
  setTasks: (tasks) => set({ tasks }),
  removeTask: (id) => set((state) => ({
    tasks: state.tasks.filter((task) => task._id !== id)
  }))
}));

function Form() {
  const addTask = useTaskStore((state) => state.addTask);
  const task = useTaskStore((state) => state.task);
  const setTask = useTaskStore((state) => state.setTask);
  const updateTask = useTaskStore((state) => state.updateTask);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());
    console.log(data);
    const { title, description } = data;
    if (task) {
      const updatedTask = { ...task, title, description };
      updateTask(updatedTask);
      toast.success("Task updated");
      setTask(null);
    } else {
      const newtask = await createTask(title, description);
      addTask(newtask);
      toast.success("Task added");
    }
    e.target.reset();
  };
  return /* @__PURE__ */ jsx("section", { className: "h-64 flex-1 flex justify-center items-start", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "w-screen flex flex-col justify-center items-center gap-4", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        placeholder: "Title",
        className: "placeholder-white text-slate-100 bg-slate-600 py-1 px-2 rounded-lg w-1/2 max-sm:w-72",
        name: "title",
        defaultValue: task?.title
      }
    ),
    /* @__PURE__ */ jsx(
      "textarea",
      {
        placeholder: "Description",
        className: "resize-none placeholder-white text-slate-100 bg-slate-600 h-36 py-1 px-2 rounded-lg w-1/2 max-sm:w-72",
        name: "description",
        defaultValue: task?.description || ""
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "submit",
        className: "hover:bg-white hover:text-black hover:border-sky-700 bg-slate-800 rounded-lg text-white py-1 border-2 border-slate-400 w-1/3",
        children: task ? "Completed Edit" : "Add"
      }
    )
  ] }) });
}

async function fetchTasks() {
  const res = await fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await res.json();
  return data;
}

async function deleteTaskFecth(id) {
  const response = await fetch(API_URL + `/${id}`, {
    method: "DELETE"
  });
  const data = await response.json();
  return data;
}

function Card() {
  const { tasks, setTasks, removeTask, task, setTask } = useTaskStore((state) => state);
  async function deleteTask(id) {
    const taskDeleted = await toast.promise(deleteTaskFecth(id), {
      pending: "Deleting task...",
      success: "Task completed!",
      error: "Error deleting task"
    });
    if (!taskDeleted)
      return console.log("Error deleting task");
    removeTask(taskDeleted._id);
    console.log("Task deleted");
  }
  async function updateTask(task2) {
    setTask(task2);
  }
  useEffect(() => {
    fetchTasks().then((tasks2) => {
      setTasks(tasks2);
    });
  }, []);
  return /* @__PURE__ */ jsx("section", { className: "flex flex-col gap-4", children: tasks.map((task2) => /* @__PURE__ */ jsx("article", { className: "flex justify-center items-start", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between p-2 list-none bg-slate-900 rounded-lg text-white border-2 border-slate-500 w-1/2 max-sm:w-72", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl", children: task2.title }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-slate-400", children: task2.description })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            deleteTask(task2._id);
          },
          className: "rounded-lg bg-green-700 p-1",
          children: "Complete"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            updateTask(task2);
          },
          className: "rounded-lg bg-blue-700 p-1",
          children: "edit"
        }
      )
    ] })
  ] }) })) });
}

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Todo-List App." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "Header", $$Header, { "title": "ToDo-List App", "description": "My firt project in Astro" })} ${renderComponent($$result2, "Form", Form, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/Form", "client:component-export": "default" })} ${renderComponent($$result2, "Card", Card, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/Card", "client:component-export": "default" })} </main> ` })}`;
}, "/home/jeyllon/projects/Todo-List-Astro/Frontend/src/pages/index.astro", void 0);

const $$file = "/home/jeyllon/projects/Todo-List-Astro/Frontend/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
