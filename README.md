# Storefront-Backend
 

## to setup project 

first create `.env` file  with all the required enviroment variabels:

```bash
  # .env
    PORT=3000
  NODE_ENV=dev
  # database connection information
  POSTGRES_HOST=localhost
  POSTGRES_PORT=5432
  POSTGRES_DB=store_dev
  POSTGRES_DB_TEST=store_test
  POSTGRES_USER=postgres 
  POSTGRES_PASSWORD=password123
  BCRYPT_PASSWORD= secret-password
  SALT_ROUNDS=10
  TOKEN_SECRET= token-secret
```

connect to postgres 

```bash
   psql -U postgres
   enter postgres password 
```

create database for dev and one for testing

```bash
   CREATE DATABASE store_dev;
   CREATE DATABASE store_test
```

install all node packages

```bash
  npm install
```

run test for adding the tables on database test and run jasmine test then reset the tables useing

```bash
  npm run test
```
adding the tables on database useing

```bash
  npm run migrationup
```

after runing the test start the server using

```bash
  npm run dev
```

 
