import {Router} from 'express';
import {createTask, getTask, getTasks, updateTask, deleteTask, deleteTasks} from '../controllers/task.js';

const taskRouter = Router();

taskRouter.post('/', createTask);
taskRouter.get('/:id', getTask);
taskRouter.get('/', getTasks);
taskRouter.put('/:id', updateTask);
taskRouter.delete('/:id', deleteTask);
taskRouter.delete('/', deleteTasks);

export default taskRouter;