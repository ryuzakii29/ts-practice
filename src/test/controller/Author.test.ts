import Author from '../../routes/Author';
import mongoose from 'mongoose';
import { config } from '../../config/config';

const request = require('supertest');

beforeEach(async () => {
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
    it('should create an author', () => {
        const res = request(Author).post('/authors').send({
            name: 'Test Name'
        });

        console.log('TeST:', res.author, res.body);

        expect(res.statusCode).toBe(201);
        expect(res.body.author.name).toBe('Test Name');
    });
});
