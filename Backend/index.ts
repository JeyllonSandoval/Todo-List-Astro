import express from 'express';
import {connectDB} from './db.js';
import taskRouter from './routes/task.routes.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8322;

app.use(express.json());
app.disable('x-powered-by');
app.use(cors());

app.use('/', taskRouter);

app.use('*', (_req, res) => {
    res.status(404).json({msg: 'Not found!'});
    });

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
    });
    


    
connectDB();