import { validateWebAppData } from '@grammyjs/validator';
import { Request, Response, } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN || '';

export type ParsedInitData = {
    query_id: string;
    user: {
        id: number;
        first_name: string;
        last_name: string;
        username: string;
        language_code: string;
        is_premium: boolean;
        allows_write_to_pm: boolean;
    };
    auth_date: string;
    hash: string;
};



export function withInitDataValidation(fn: Function) {
    return async (req: Request, res: Response) => {
        const { initData } = req.query;

        if (!initData) {
            return res.status(403).json({ error: 'No initData' });
        }

        if (validateMiniAppData(initData)) {
            const parsedInitData = parseQuery(initData as string);

            return await fn(req, res, parsedInitData);
        } else {
            return res.status(403).json({ error: 'Invalid initData' });
        }
    };
}

export function parseQuery(query: string): ParsedInitData | null {
    const regex =
        /query_id=([^&]+)&user=([^&]+)&auth_date=([^&]+)&hash=([^&\s]+)/;
    const match = regex.exec(query);

    if (match) {
        const queryId = match[1];
        const user = JSON.parse(decodeURIComponent(match[2]));
        const authDate = match[3];
        const hash = match[4];

        return {
            query_id: queryId,
            user: user,
            auth_date: authDate,
            hash: hash,
        };
    }

    return null;
}

const validateMiniAppData = (rawInitData: any): boolean => {
    const initData = new URLSearchParams(rawInitData as string);

    const token = BOT_TOKEN;

    return validateWebAppData(token, initData);
};
