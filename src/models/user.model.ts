import db from '../database';
import User from '../types/user.type';

class UserModel {
    // create user
    async create(u: User): Promise<User> {
        try {
            // open connection with db
            const connection = await db.connect();
            const sql = `INSERT INTO users (email, user_name, first_name, last_name, password) values ($1, $2, $3, $4, $5) 
            RETURNING email, user_name, first_name, last_name`;
            //  run query sql
            const result = await connection.query(sql, [u.email, u.user_name, u.first_name, u.last_name, u.password,]);
            // release connection
            connection.release();
            // returne created user
            return result.rows[0];

        } catch (error) {
            throw new Error(`Unable to create (${u.user_name}): ${(error as Error).message}`);
        }
    }
    // get all users
    async showall(): Promise<User[]> {
        try {
            // open connection with db
            const connection = await db.connect();
            const sql = `SELECT id, email, user_name, first_name, last_name FROM users `;
            //  run query sql
            const result = await connection.query(sql);
            // release connection
            connection.release();
            // returne created user
            return result.rows;

        } catch (error) {
            throw new Error(`Error at retrieving users ${(error as Error).message}`);
        }
    }
    // get specific user
    async showone(id: string): Promise<User> {
        try {
            // open connection with db
            const connection = await db.connect();
            const sql = `SELECT id, email, user_name, first_name, last_name FROM users WHERE id=$1`;
            //  run query sql
            const result = await connection.query(sql, [id]);
            // release connection
            connection.release();
            // returne created user
            return result.rows[0];

        } catch (error) {
            throw new Error(`Can't find user ${id}, ${(error as Error).message}`);
        }
    }
    // update user
    async updateone(u: User): Promise<User> {
        try {
            // open connection with db
            const connection = await db.connect();
            const sql = `UPDATE users SET  email=$1, user_name=$2, first_name=$3, last_name=$4, password=$5 WHERE id=$6  
            RETURNING email, user_name, first_name, last_name`;
            //  run query sql
            const result = await connection.query(sql, [
                u.email,
                u.user_name,
                u.first_name,
                u.last_name,
                u.password,
                u.id,
            ]);
            // release connection
            connection.release();
            // returne created user
            return result.rows[0];

        } catch (error) {
            throw new Error(`Can't update user: ${u.user_name}, ${(error as Error).message}`);
        }
    }
    // delete user
    async deleteone(id: string): Promise<User> {
        try {
            // open connection with db
            const connection = await db.connect();
            const sql = `DELETE FROM users WHERE id=($1) RETURNING email, user_name, first_name, last_name`;
            //  run query sql
            const result = await connection.query(sql, [id]);
            // release connection
            connection.release();
            // returne created user
            return result.rows[0];

        } catch (error) {
            throw new Error(`Can't delete user ${id}, ${(error as Error).message}`);
        }
    }
    // authenticate user
}

export default UserModel;