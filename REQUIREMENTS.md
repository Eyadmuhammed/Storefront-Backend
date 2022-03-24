# API Requirements
 

## API Endpoints

#### Users
- Create new user                       POST    http://localhost:3000/api/users
- Show all users  [token required]      GET     http://localhost:3000/api/users
- Show one user   [token required]      GET     http://localhost:3000/api/users/:id
- Update one user [token required]      PATCH   http://localhost:3000/api/users/:id
- Delete one user [token required]      DELETE  http://localhost:3000/api/users/:id
- Login                                 POST    http://localhost:3000/api/users/login

create user you need to sent in request body like this
```bash
        "email": "muhammed@salah.com",
        "user_name": "mosalah",
        "first_name": "mohammed",
        "last_name": "salah",
        "password": "salah123",
```

login user you need to send request body like this
```bash
        "email": "muhammed@salah.com",
        "password": "salah123",
```

after login adding the token to the bearer authentication


#### Products
- Create new product                       POST    http://localhost:3000/api/products
- Show all products  [token required]      GET     http://localhost:3000/api/products
- Show one product   [token required]      GET     http://localhost:3000/api/products/:id
- Update one product [token required]      PATCH   http://localhost:3000/api/products/:id
- Delete one product [token required]      DELETE  http://localhost:3000/api/products/:id

create Product you need to sent in request body like this
```bash
        "product_name": "salah product",
        "product_des": "product description",
        "price": "5324",
```

#### Orders
- Create new order [token required]      POST    http://localhost:3000/api/orders
- Show all orders  [token required]      GET     http://localhost:3000/api/orders
- Show one order   [token required]      GET     http://localhost:3000/api/orders/:id
- Update one order [token required]      PATCH   http://localhost:3000/api/orders/:id
- Delete one order [token required]      DELETE  http://localhost:3000/api/orders/:id

create order you need to sent in request body like this
```bash
        "user_id": 1,
        "status": "active",
```

#### Orders List
- Create new order  [token required]     POST    http://localhost:3000/api/orderlists
- Show all orders                        GET     http://localhost:3000/api/orderlists
- Show one order                         GET     http://localhost:3000/api/orderlists/:id
- Update one order [token required]      PATCH   http://localhost:3000/api/orderlists/:id
- Delete one order [token required]      DELETE  http://localhost:3000/api/orderlists/:id

create order list you need to sent in request body like this
```bash
        "order_id": 1,
        "quantity": 5,
        "product_id": 1,
```

#### Orders List for user
- Show all orders for an user           GET      http://localhost:3000/api/orderlists_foruser/:id

create all order for one user you need to sent in request user id
```bash
        http://localhost:3000/api/orderlists_foruser/1
```

## Data Shapes

#### Product
- id
- product_name
- product_des
- price

```bash 
    CREATE TABLE products (
        id SERIAL PRIMARY KEY, 
        product_name VARCHAR (50) NOT NULL,
        product_des text  NOT NULL,
        price VARCHAR (100) NOT NULL
    );
```

#### User
- id
- email
- user_name
- first_Name
- last_Name
- password

```bash
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR (50) UNIQUE,
        user_name VARCHAR (50) NOT NULL,
        first_name VARCHAR (50) NOT NULL,
        last_name VARCHAR (50) NOT NULL,
        password VARCHAR (255) NOT NULL
    );
```

#### Orders
- id
- user_id
- status of order (active or complete)

```bash
  CREATE TABLE orders (
    id SERIAL PRIMARY KEY, 
    user_id integer REFERENCES users(id), 
    status varchar (50)
);
```

#### Order_Lists
- id
- id of product in order
- quantity of product
- id of the order

```bash
    CREATE TABLE order_products (
        id SERIAL PRIMARY KEY, 
        order_id integer REFERENCES orders(id),
        quantity integer, 
        product_id integer REFERENCES products(id)
    );
```
