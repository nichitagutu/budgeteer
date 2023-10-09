import { Request, Response } from 'express';
import {
    addTransactionQuery,
    deleteTransactionQuery,
    editTransactionQuery,
    listTransactionsByUserIdQuery,
    listTransactionsQuery
} from '../database/queries';
import { withInitDataValidation, ParsedInitData } from '../validators/miniAppData';

export const addTransaction = withInitDataValidation(async (req: Request, res: Response, initData: ParsedInitData) => {
    try {
        const transaction = req.body;
        transaction.user_id = initData.user.id;

        const result = await addTransactionQuery(transaction);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export const deleteTransaction = withInitDataValidation(async (req: Request, res: Response, initData: ParsedInitData) => {
    try {
        const { id } = req.params;

        const userId = initData.user.id;
        await deleteTransactionQuery(parseInt(id), userId);
        res.status(204).end();
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export const editTransaction = withInitDataValidation(async (req: Request, res: Response, initData: ParsedInitData) => {
    try {
        const { id } = req.params;
        const transaction = req.body;
        const userId = initData.user.id;
        const result = await editTransactionQuery(parseInt(id), transaction, userId);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});


export const listTransactions = withInitDataValidation(async (req: Request, res: Response, initData: ParsedInitData) => {
    try {
        const transactions = await listTransactionsQuery();
        res.json({ transactions, initData });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export const getTransactionsByUserId = withInitDataValidation(
    async (req: Request, res: Response, initData: ParsedInitData) => {
        try {
            const userId = initData.user.id;
            const transactions = await listTransactionsByUserIdQuery(userId);
            res.status(200).json(transactions);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
);
