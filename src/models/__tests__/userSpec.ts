import UserModel from "../user.model";
import db from "../../database";
import User from "../../types/user.type";

const userModel = new UserModel();

describe('User Model', () => {
    describe('test the Models that is exists', () => {
        it('should have a show all Users model', () => {
            expect(userModel.showall).toBeDefined();
        });

        it('should have a Create User model', () => {
            expect(userModel.create).toBeDefined();
        });

        it('should have a show one User model', () => {
            expect(userModel.showone).toBeDefined();
        });

        it('should have an update one User model', () => {
            expect(userModel.updateone).toBeDefined();
        });

        it('should have a delete one User model', () => {
            expect(userModel.deleteone).toBeDefined();
        });

        it('should have a Login User model', () => {
            expect(userModel.login).toBeDefined();
        });
    });

    describe('test the user model logic', () => {
        const user = {
            email: 'test@salah.com',
            user_name: 'salah12345',
            first_name: 'mohammed',
            last_name: 'salah',
            password: 'salah123',
        } as User;

        beforeAll(async () => {
            const createdUser = await userModel.create(user);
            // user.id = createdUser.id;
        });

        afterAll(async () => {
            const connection = await db.connect();
            const sql = 'DELETE FROM users;   ALTER SEQUENCE users_id_seq RESTART WITH 1;';
            await connection.query(sql);
            connection.release();
        });

        it('the Create model should return a New User', async () => {
            const createdUser = await userModel.create({
                email: 'test2@salah.com',
                user_name: 'salah2222',
                first_name: 'mohammed22',
                last_name: 'salah22',
                password: 'test'
            } as User);
            expect(createdUser).toEqual({
                email: 'test2@salah.com',
                user_name: 'salah2222',
                first_name: 'mohammed22',
                last_name: 'salah22',
            } as User);
        });

        it('Show all model should return all available user in the database', async () => {
            const users = await userModel.showall();
            expect(users.length).toBe(2);
        });

        it('Show one model should return an user with called id', async () => {
            const returneduser = await userModel.showone('1');
            expect(returneduser.id).toBe(1);
            expect(returneduser.email).toBe(user.email);
            expect(returneduser.user_name).toBe(user.user_name);
            expect(returneduser.first_name).toBe(user.first_name);
            expect(returneduser.last_name).toBe(user.last_name);
        });

        it('Update one model should return the user new edite', async () => {
            const updateduser = await userModel.updateone(user.id as unknown as string, {
                email: 'test@salah.com',
                password: 'salah123',
                user_name: 'userupdated',
                first_name: 'Eyad',
                last_name: 'adam',
            });
            expect(updateduser.id).toBe(user.id);
            expect(updateduser.email).toBe(user.email);
            expect(updateduser.user_name).toBe('userupdated');
            expect(updateduser.first_name).toBe('Eyad');
            expect(updateduser.last_name).toBe('adam');

        });

        it('Delete one model should delete an user from the database', async () => {
            const deleteduser = await userModel.deleteone('1');
            expect(deleteduser.id).toBe(user.id);
        });
    });
});
