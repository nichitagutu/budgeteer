import { Request, Response } from 'express';
import { addUserQuery } from '../database/queries';
import { ParsedInitData, withInitDataValidation } from '../validators/miniAppData';

export const addUser = withInitDataValidation(async (req: Request, res: Response, initData: ParsedInitData) => {
    try {
        const result = await addUserQuery(initData.user);

        if (!result) {
            return res.status(403).json({ error: 'User already exists' });
        } else {
            res.status(201).json({ result });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});
