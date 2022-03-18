import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('test endpoint', () => {
    it('Get / endpoint', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });
});