import { pool } from './index';

export const addTransactionQuery = async (transaction: any) => {
    const query = `
        INSERT INTO "transaction" (value, description, category, emoji, telegram_id)
        VALUES ($1, $2, $3, $4, $5);
    `;

    const values = [transaction.value, transaction.description, transaction.category, transaction.emoji, transaction.telegram_id];

    try {

        await pool.query(query, values);
    }
    catch (error) {
        return false;
    }

    return true;
};

export const addUserQuery = async (user: any) => {
    const query = `
        INSERT INTO "user" (telegram_id, username, first_name, last_name, language_code)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (telegram_id) 
        DO NOTHING
        RETURNING *;
    `;

    const values = [user.id, user.username, user.first_name, user.last_name, user.language_code];
    const { rows } = await pool.query(query, values);

    return rows[0] || null;
};


export const deleteTransactionQuery = async (transactionId: number, userId: number) => {
    const query = `
        DELETE FROM "transaction"
        WHERE id = $1 AND telegram_id = $2;
    `;

    await pool.query(query, [transactionId, userId]);
};


export const editTransactionQuery = async (transactionId: number, transaction: any, userId: number) => {
    const query = `
        UPDATE "transaction"
        SET value = $1, description = $2, category = $3, emoji = $4, telegram_id = $5
        WHERE id = $6 AND telegram_id = $7
        RETURNING *;
    `;

    const values = [transaction.value, transaction.description, transaction.category, transaction.emoji, userId, transactionId, userId];



    try {
        await pool.query(query, values);
    } catch (error) {
        return false;
    }


    return true;
};



export const listTransactionsQuery = async () => {
    const query = `
        SELECT * FROM "transaction";
    `;

    const { rows } = await pool.query(query);

    return rows;
};


export const listTransactionsByUserIdQuery = async (telegram_id: number) => {
    const result = await pool.query('SELECT * FROM "transaction" WHERE telegram_id = $1', [telegram_id]);
    return result.rows;
};
