import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('Her we will test the endpoint Server', () => {
    it('Get the endpoint', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });
});