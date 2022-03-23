import db from '../database';
import OrderList from '../types/orderlists.type';


export class OrderListsModel {

    async create(ol: OrderList): Promise<OrderList> {
        try {
            const connection = await db.connect();
            const sql = 'INSERT INTO order_products (order_id, quantity, product_id) VALUES($1, $2, $3) RETURNING *;';
            const result = await connection.query(sql, [ol.order_id, ol.quantity, ol.product_id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not add a new order_product from order ${ol.order_id}. ${(error as Error).message}`);
        }
    }

    async showall(): Promise<OrderList[]> {
        try {
            const connection = await db.connect();
            const sql = 'SELECT * FROM order_products;';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Could not Show order_products lists. ${(error as Error).message}`)
        }
    }

    async showone(id: string): Promise<OrderList> {
        try {
            const connection = await db.connect();
            const sql = `SELECT * FROM order_products WHERE id=${id};`;
            const result = await connection.query(sql);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not find order_product id ${id}. ${(error as Error).message}`)
        }
    }


    async updateone(id: string, ol: OrderList): Promise<OrderList> {
        try {
            const connection = await db.connect();
            const sql = `UPDATE order_products SET order_id = $1, quantity = $2, product_id = $3 WHERE id=${id} RETURNING *;`;
            const result = await connection.query(sql, [ol.order_id, ol.quantity, ol.product_id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not update order_product  id ${ol.id}. ${(error as Error).message}`);
        }
    }

    async deleteone(id: string): Promise<OrderList> {
        try {
            const connection = await db.connect();
            const sql = `DELETE FROM order_products WHERE id=${id} RETURNING *;`;
            const result = await connection.query(sql);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not delete order_product with id ${id}. ${(error as Error).message}`)
        }
    }

    async getAllOrders(id: string): Promise<any> {
        try {
            const connection = await db.connect();
            const sql = `SELECT order_id, product_name, product_des, price, quantity, status FROM orders INNER JOIN order_products ON id(orders)=order_id INNER JOIN products ON product_id=id(products) INNER JOIN users ON user_id=id(users) WHERE user_id=${id};`
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error("Could not get all orders from user_id " + id);
        }
    }
}

export default OrderListsModel;