/* Replace with your SQL commands */
CREATE TABLE order_products (
    id SERIAL PRIMARY KEY, 
    order_id integer REFERENCES orders(id),
    quantity integer, 
    product_id integer REFERENCES products(id)
);