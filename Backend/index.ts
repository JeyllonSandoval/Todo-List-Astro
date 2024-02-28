import express from 'express';
import {connectDB} from './db.js';
import taskRouter from './routes/task.routes.js';
import { favicon } from './middlewares/favicon.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8322;

favicon();

app.use(express.json());
app.use(cors(
    {
        origin: ["https://astro-todo-list-8322.vercel.app", "http://localhost:4321"],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    }
));

app.use('/', taskRouter);

app.use('*', (_req, res) => {
    res.status(404).json({msg: 'Not found!'});
    });

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
    });
    


    
connectDB();