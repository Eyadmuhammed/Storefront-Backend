import UserModel from "../user.model";
import db from "../../database";
import User from "../../types/user.type";

const userModel = new UserModel();

describe('Authentication Module', () => {
    describe('test that the methods are exists', () => {
        it('Should have an login User Method', () => {
            expect(userModel.login).toBeDefined();
        });
    });

    describe('Here will test the Authenticate logic', () => {
        const user = {
            email: 'test333@test.com',
            user_name: 'MuhammedSalah',
            first_name: 'Muhammed',
            last_name: 'Salah',
            password: 'password123',
        } as User;

        beforeAll(async () => {
            const createUser = await userModel.create(user);
            // user.id = 1;
        });

        afterAll(async () => {
            const connection = await db.connect();
            const sql = 'DELETE FROM users;   ALTER SEQUENCE users_id_seq RESTART WITH 1;';
            await connection.query(sql);
            connection.release();
        });

        it('The Authenticate method should return the login user', async () => {
            const loginUser = await userModel.login(user.email, user.password as string);
            expect(loginUser?.email).toBe(user.email);
            expect(loginUser?.user_name).toBe(user.user_name);
            expect(loginUser?.first_name).toBe(user.first_name);
            expect(loginUser?.last_name).toBe(user.last_name);
        });

        it('The Authenticate method should return null for the wrong Email or password', async () => {
            const loginUser = await userModel.login('mohammed@salah.com', 'wrong-password');
            expect(loginUser).toBe(null);
        });

    });
});