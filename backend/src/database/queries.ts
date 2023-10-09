import { pool } from './index';

export const addTransactionQuery = async (transaction: any) => {
    const query = `
        INSERT INTO "transaction" (value, description, category, emoji, user_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;

    const values = [transaction.value, transaction.description, transaction.category, transaction.emoji, transaction.user_id];
    const { rows } = await pool.query(query, values);

    return rows[0];
};

export const deleteTransactionQuery = async (transactionId: number, userId: number) => {
    const query = `
        DELETE FROM "transaction"
        WHERE id = $1 AND user_id = $2;
    `;

    await pool.query(query, [transactionId, userId]);
};


export const editTransactionQuery = async (transactionId: number, transaction: any, userId: number) => {
    const query = `
        UPDATE "transaction"
        SET value = $1, description = $2, category = $3, emoji = $4, user_id = $5
        WHERE id = $6 AND user_id = $7
        RETURNING *;
    `;

    const values = [transaction.value, transaction.description, transaction.category, transaction.emoji, transaction.user_id, transactionId, userId];
    const { rows } = await pool.query(query, values);

    return rows[0];
};


export const addUserQuery = async (user: any) => {
    const query = `
        INSERT INTO "user" (telegram_id, username, first_name, last_name, language_code)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;

    const values = [user.telegram_id, user.username, user.first_name, user.last_name, user.language_code];
    const { rows } = await pool.query(query, values);

    return rows[0];
};

export const listTransactionsQuery = async () => {
    const query = `
        SELECT * FROM "transaction";
    `;

    const { rows } = await pool.query(query);

    return rows;
};


export const listTransactionsByUserIdQuery = async (userId: number) => {
    const result = await pool.query('SELECT * FROM "transaction" WHERE user_id = $1', [userId]);
    return result.rows;
};
