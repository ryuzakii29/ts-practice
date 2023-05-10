import Author from '../../routes/Author';
import mongoose from 'mongoose';
import { config } from '../../config/config';

const request = require('supertest');

beforeAll(async () => {
    mongoose.set('strictQuery', true);
    await mongoose.connect(config.mongo.url);
});

afterAll(async () => {
    await mongoose.connection.close();
});

const mockData = [
    {
        _id: '64560b670761a24f5caa27cf',
        name: 'test 1'
    },
    {
        _id: '64560b7e0761a24f5caa27d2',
        name: 'test 2'
    }
];

describe('POST /authors', () => {
    it('should create an author', async () => {
        const res = await request(Author).post('/authors').send({
            name: 'Test Name'
        });

        expect(res.statusCode).toBe(201);
        expect(res.body.author).toBe({
            name: 'Test Name'
        });
    });
});
