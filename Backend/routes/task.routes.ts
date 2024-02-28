import {Router} from 'express';
import {createTask, getTask, getTasks, updateTask, deleteTask, deleteTasks} from '../controllers/task.js';

const taskRouter = Router();

taskRouter.post('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    createTask(req, res);
});

taskRouter.get('/:id', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    getTask(req, res);
});

taskRouter.get('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    getTasks(req, res);
});

taskRouter.put('/:id', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    updateTask(req, res);
});

taskRouter.delete('/:id', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    deleteTask(req, res);
});

taskRouter.delete('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    deleteTasks(req, res);
});


export default taskRouter;