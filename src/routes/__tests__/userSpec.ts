import supertest from "supertest";
import db from "../../database";
import UserModel from "../../models/user.model";
import User from "../../types/user.type";
import app from "../../server";

const userModel = new UserModel;
const request = supertest(app);
let token = '';

describe('users API endpoints', () => {
    const user = {
        email: 'loginmail@salah.com',
        user_name: 'userlogin',
        first_name: 'mohammed',
        last_name: 'salah',
        password: 'userpassword',
    } as User;

    beforeAll(async () => {
        const createUser = await userModel.create(user);
        // user.id = createUser.id;
    });

    afterAll(async () => {
        const connection = await db.connect();
        const sql = 'DELETE FROM users;  ALTER SEQUENCE users_id_seq RESTART WITH 1;';
        await connection.query(sql);
        connection.release();
    });


    describe('test login Model', () => {
        it('should be able to login to get token', async () => {
            const res = await request
                .post('/api/users/login')
                .set('content-type', 'application/json')
                .send({
                    email: 'loginmail@salah.com',
                    password: 'userpassword',
                });
            expect(res.status).toBe(200);
            const { id, email, token: userToken } = res.body.data;
            expect(id).toBe(1);
            expect(email).toBe('loginmail@salah.com');
            token = userToken;
        });

        it('should be failed to login with wrong email or password', async () => {
            const res = await request
                .post('/api/users/login')
                .set('content-type', 'application/json')
                .send({
                    email: 'wrong@salah.com',
                    password: 'eyad123',
                });
            expect(res.status).toBe(401);
        });
    });

    describe('test the api CRUD routes', () => {
        it('this route should create a new user', async () => {
            const res = await request
                .post('/api/users/')
                .set('content-type', 'application/json')
                .send({
                    email: 'test23@salah.com',
                    user_name: 'salahuser2',
                    first_name: 'mohammed',
                    last_name: 'adam',
                    password: 'salah123',
                } as User);
            expect(res.status).toBe(200);
            const { email, user_name, first_name, last_name } = res.body.data;
            expect(email).toBe('test23@salah.com');
            expect(user_name).toBe('salahuser2');
            expect(first_name).toBe('mohammed');
            expect(last_name).toBe('adam');
        });

        it('this route should show list of users', async () => {
            const res = await request
                .get('/api/users/')
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
        });

        it('this route should show Info for an user', async () => {
            const res = await request
                .get('/api/users/1')
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.data.user_name).toBe('userlogin');
            expect(res.body.data.email).toBe('loginmail@salah.com');
        });

        it('this route should update an Info for an user', async () => {
            const res = await request
                .patch('/api/users/1')
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    id: (1),
                    email: 'loginmail@salah.com',
                    password: 'userpassword',
                    user_name: 'Muhammedsalah',
                    first_name: 'Muhammed',
                    last_name: 'Salah',
                });
            expect(res.status).toBe(200);
            const { id, email, user_name, first_name, last_name } = res.body.data;
            expect(id).toBe(user.id);
            expect(email).toBe(user.email);
            expect(user_name).toBe('Muhammedsalah');
            expect(first_name).toBe('Muhammed');
            expect(last_name).toBe('Salah');
        });

        it('this route should delete an user', async () => {
            const res = await request
                .delete('/api/users/1')
                .set('content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.data.id).toBe(user.id);
            expect(res.body.data.user_name).toBe('Muhammedsalah');
        });

    });

});
