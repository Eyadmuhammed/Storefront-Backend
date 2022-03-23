import db from '../database';
import Product from '../types/product.type';


class ProductModel {

    private formatProduct(product: {
        id?: number;
        product_name: string;
        product_des: string;
        price: string;
    }): Product {
        return {
            id: product.id,
            product_name: product.product_name,
            product_des: product.product_des,
            price: product.price
        };
    }

    async create(p: Product): Promise<Product> {
        try {
            const connection = await db.connect();
            const sql = 'INSERT INTO products (product_name, product_des, price) values ($1, $2, $3) RETURNING *';
            const result = await connection.query(sql, [p.product_name, p.product_des, p.price]);
            connection.release();
            return this.formatProduct(result.rows[0]);
        } catch (error) {
            throw new Error(`Could not create product ${(error as Error).message}`)
        }
    }

    async showAllproducts(): Promise<Product[]> {
        try {
            const connection = await db.connect();
            const sql = 'SELECT * FROM products';
            const result = await connection.query(sql);
            connection.release();
            return result.rows.map((p) => this.formatProduct(p));
        } catch (error) {
            throw new Error(`Error at Show all products  ${(error as Error).message}`)
        }
    }

    async showoneproduct(id: number): Promise<Product> {
        try {
            const connection = await db.connect();
            const sql = `SELECT * FROM products WHERE id= $1 `;
            const result = await connection.query(sql, [id]);
            connection.release();
            return this.formatProduct(result.rows[0]);
        } catch (error) {
            throw new Error(`Error at Show one  product  ${(error as Error).message}`);
        }
    }

    async updateoneproduct(id: string, p: Product): Promise<Product> {
        try {
            const connection = await db.connect();
            const sql = `UPDATE products SET product_name = $1, product_des = $2, price = $3 WHERE id= ${id} RETURNING *`;
            const result = await connection.query(sql, [
                p.product_name,
                p.product_des,
                p.price,
            ]);
            connection.release();
            return this.formatProduct(result.rows[0]);
        } catch (error) {
            throw new Error(`Error at update one product  ${(error as Error).message}`);
        }
    }

    async deleteoneproduct(id: number): Promise<Product> {
        try {
            const connection = await db.connect();
            const sql = `DELETE FROM products WHERE id=${id} RETURNING *`;
            const result = await connection.query(sql);
            connection.release();
            return this.formatProduct(result.rows[0]);
        } catch (error) {
            throw new Error(`Error at delete one product  ${(error as Error).message}`);
        }
    }

}

export default ProductModel;