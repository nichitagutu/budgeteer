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
        transaction.telegram_id = initData.user.id;
        const result = await addTransactionQuery(transaction);

        if (!result) {
            return res.status(403).json({ error: 'Transaction already exists' });
        } else {
            res.status(201).json({ result });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export const deleteTransaction = withInitDataValidation(async (req: Request, res: Response, initData: ParsedInitData) => {
    try {
        const { id } = req.params;

        const userId = initData.user.id;

        try {
            await deleteTransactionQuery(parseInt(id), userId);
        } catch (error: any) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export const editTransaction = withInitDataValidation(async (req: Request, res: Response, initData: ParsedInitData) => {
    try {

        console.log("EDIT TRANSACTION")
        const { id } = req.params;

        const transaction = req.body;
        const userId = initData.user.id;
        const result = await editTransactionQuery(parseInt(id), transaction, userId);


        if (!result) {
            return res.status(403).json({ error: 'Transaction not found' });
        } else {
            res.status(200).json({ message: 'Transaction edited successfully' });
        }
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
            const telegram_id = initData.user.id;
            const transactions = await listTransactionsByUserIdQuery(telegram_id);
            res.status(200).json({ transactions });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
);
