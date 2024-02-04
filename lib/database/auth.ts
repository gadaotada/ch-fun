import { RowDataPacket } from 'mysql2/promise';

import pool from './conn';
import { timeStampGen } from '@/lib/helpers';

import type { User } from '@/types';

//Read section 
export const getUser = async (email: string): Promise<User | null> => {
    const poolConn = await pool.getConnection();
    try {
        const [rows] = await poolConn.query<RowDataPacket[]>('SELECT id, username, avatar FROM users WHERE email = ?', [email]);
        if (rows.length > 0) {
            return {
                id: rows[0].id,
                name: rows[0].username,
                avatar: rows[0].avatar
            };
        }

        return null;

    } catch (error) {
        console.error(`${timeStampGen()} Error generated by func getUser: ${error}`);
        return null;
    } finally {
        poolConn.release();
    };
};