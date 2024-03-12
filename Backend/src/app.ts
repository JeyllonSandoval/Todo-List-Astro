import express from 'express';
import {createRoles} from './libs/initialSetup';

const app = express();
createRoles();
app.use(express.json());

export default app;
