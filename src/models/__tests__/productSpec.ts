import ProductModel from "../product.model";
import db from "../../database";
import Product from "../../types/product.type";

const productModel = new ProductModel();

describe('Product Model', () => {
    describe('test the Product Models that is exists', () => {
        it('should have a show all Products model', () => {
            expect(productModel.showAllproducts).toBeDefined();
        });

        it('should have a Create new Product model', () => {
            expect(productModel.create).toBeDefined();
        });

        it('should have a show one Product model', () => {
            expect(productModel.showoneproduct).toBeDefined();
        });

        it('should have an update one Product model', () => {
            expect(productModel.updateoneproduct).toBeDefined();
        });

        it('should have a delete one Product model', () => {
            expect(productModel.deleteoneproduct).toBeDefined();
        });
    });

    describe('test the Product model logic', () => {
        const product = {
            id: 1,
            product_name: 'productname',
            product_des: 'product description',
            price: '98'
        } as Product;

        afterAll(async () => {
            const connection = await db.connect();
            const sql = 'DELETE FROM products;   ALTER SEQUENCE products_id_seq RESTART WITH 1;';
            await connection.query(sql);
            connection.release();
        });

        it('the Create model should return a New Product', async () => {
            const createdProduct = await productModel.create({
                product_name: 'productname',
                product_des: 'productname des',
                price: '98'
            });
            expect(createdProduct).toEqual({
                id: createdProduct.id,
                product_name: 'productname',
                product_des: 'productname des',
                price: '98'
            } as Product);
        });

        it('Show all model should return all available Products in the database', async () => {
            const products = await productModel.showAllproducts();
            expect(products.length).toBe(1);
        });

        it('Show one model should return an product with called id', async () => {
            const returnedproduct = await productModel.showoneproduct(product.id as number);
            expect(returnedproduct.id).toBe(product.id);
            expect(returnedproduct.product_name).toBe('productname');
            expect(returnedproduct.price).toBe(`98`);
        });

        it('Update one model should return the product new edite', async () => {
            const updatedProduct = await productModel.updateoneproduct(product.id as unknown as string, {
                product_name: 'newname',
                product_des: 'newname des',
                price: '123',
            });
            expect(updatedProduct.id).toBe(product.id);
            expect(updatedProduct.product_name).toBe('newname');
            expect(updatedProduct.product_des).toBe('newname des');
            expect(updatedProduct.price).toBe('123');
        });

        it('Delete one model should delete a Product from the database', async () => {
            const deletedProduct = await productModel.deleteoneproduct(1);
            expect(deletedProduct.id).toBe(1);
        });
    });
});
