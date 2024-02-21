import express from 'express';
import {connectDB} from './db.ts';
import taskRouter from './routes/task.routes.ts';
import { favicon } from './middlewares/favicon.ts';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8322;

favicon();

app.use(express.json());
app.use(cors());

app.use('/', taskRouter);

app.use('*', (_req, res) => {
    res.status(404).json({msg: 'Not found!'});
    });

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
    });
    


connectDB();