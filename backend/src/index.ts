import express from 'express';
import userRouter from './routers/userRouter';
import transactionRouter from './routers/transactionRouter';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
const port = 3000;

app.use(cors());
app.use(morgan('combined'));

app.use(express.json());
app.use('/users', userRouter);
app.use('/transactions', transactionRouter);

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
