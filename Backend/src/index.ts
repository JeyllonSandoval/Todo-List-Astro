import app from './app.js';
import {connectDB} from './db.js';
import taskRouter from '../src/routes/task.routes.js';
import authRouter from '../src/routes/auth.routes.js';
import cors from 'cors';

const PORT = process.env.PORT || 8322;

app.get('/favicon.ico', (req, res) => {
    res.status(204).end();
});

app.disable('x-powered-by');
app.use(cors());

//Routes
app.use('/task', taskRouter);
app.use('/', authRouter)

//Error handling
app.use('*', (_req, res) => {
    res.status(404).json({msg: 'Not found!'});
});

app.use('/', (_req, res) => {
    res.status(200).json({msg: 'Funcionalidad disponible!'});
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});


connectDB();