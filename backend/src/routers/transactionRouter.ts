import express from 'express';
import {
    addTransaction,
    deleteTransaction,
    editTransaction,
    getTransactionsByUserId,
    listTransactions
} from '../controllers/transactionController';

const transactionRouter = express.Router();

transactionRouter.post('/', addTransaction);
transactionRouter.delete('/:id', deleteTransaction);
transactionRouter.put('/:id', editTransaction);
transactionRouter.get('/', listTransactions);
transactionRouter.get('/user/:userId', getTransactionsByUserId);


export default transactionRouter;
