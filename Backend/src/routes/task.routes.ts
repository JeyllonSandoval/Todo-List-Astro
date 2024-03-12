import {Router} from 'express';
import {createTask, getTask, getTasks, updateTask, deleteTask, deleteTasks} from '../controllers/task.js';
import {authJWT} from '../middlewares';

const taskRouter = Router();

taskRouter.post('/', [authJWT.verifyToken], createTask);
taskRouter.get('/', [authJWT.verifyToken, authJWT.verifyAdmin], getTasks);
taskRouter.get('/:id', [authJWT.verifyToken], getTask);
taskRouter.put('/:id', [authJWT.verifyToken], updateTask);
taskRouter.delete('/:id', [authJWT.verifyToken], deleteTask);
taskRouter.delete('/', [authJWT.verifyToken, authJWT.verifyModerator], deleteTasks);

export default taskRouter;