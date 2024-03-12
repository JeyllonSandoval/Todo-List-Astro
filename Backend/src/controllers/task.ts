import type { Request, Response } from 'express';
import taskSchema from '../models/Task.js';

export const createTask = async(req: Request, res: Response) => {
    const task = new taskSchema(req.body);
    await task.save();
    res.json(task);
};

export const getTask = (req: Request, res: Response) => {
    taskSchema.findById(req.params.id).then((task) => {
        res.json(task);
    });
};

export const getTasks = (req: Request, res: Response) => {
    taskSchema.find().then((tasks) => {
        res.json(tasks);
    });
};

export const updateTask = (req: Request, res: Response) => {
    taskSchema.findByIdAndUpdate(req.params.id, req.body).then(() => {
        res.json('Task updated!');
    });
};

export const deleteTask = async (req: Request, res: Response) => {
    const task = await taskSchema.findByIdAndDelete(req.params.id);
    // setTimeout(() => {
    //     res.json(task);
    // }
    // , 3000);
    res.json(task);
};

export const deleteTasks = (req: Request, res: Response) => {
    taskSchema.deleteMany().then(() => {
        res.json('All tasks deleted!');
    });
};




