import db from '../database';
import Order from '../types/order.type';


class OrderModel {
    async create(o: Order): Promise<Order> {
        try {
            const connection = await db.connect();
            const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *;';
            const result = await connection.query(sql, [o.user_id, o.status]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not add new order from user ${o.user_id}.${(error as Error).message}`);
        }
    }

    async showall(): Promise<Order[]> {
        try {
            const connection = await db.connect();
            const sql = 'SELECT * FROM orders;';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Could not get all orders ${(error as Error).message}`)
        }
    }

    async showone(id: string): Promise<Order> {
        try {
            const connection = await db.connect();
            const sql = `SELECT * FROM orders WHERE id=${id};`;
            const result = await connection.query(sql);
            connection.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Could not find order  ${(error as Error).message}`)
        }
    }

    async updateone(id: string, o: Order): Promise<Order> {
        try {
            const connection = await db.connect();
            const sql = `UPDATE orders SET user_id = $1, status = $2 WHERE id=${id} RETURNING *;`;
            const result = await connection.query(sql, [o.user_id, o.status]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not update order  ${(error as Error).message}`);
        }
    }

    async deleteone(id: string): Promise<Order> {
        try {
            const connection = await db.connect();
            const sql = `DELETE FROM orders WHERE id=${id} RETURNING *;`;
            const result = await connection.query(sql);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not delete order  ${(error as Error).message}`)
        }
    }

}

export default OrderModel;