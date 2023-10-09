import { Request, Response } from 'express';
import { addUserQuery } from '../database/queries';

export const addUser = async (req: Request, res: Response) => {
    try {
        const user = req.body;
        const result = await addUserQuery(user);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
