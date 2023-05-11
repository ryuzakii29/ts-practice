import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Author from '../../models/Author';
import controller from '../../controllers/Author';
import { config } from '../../config/config';

const req = {} as Request;
const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
} as unknown as Response;
const next = jest.fn();
beforeAll(async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.mongo.test_url);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Author Controller', () => {
    it('should return all author', async () => {
        await controller.readAll(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
    });
    it('should return an author', async () => {
        const request: any = {
            params: {
                authorId: '645b9e930702476379c8fcfc'
            }
        };
        await controller.readAuthor(request, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
    });
    it('should save an author', async () => {
        const request: any = {
            body: { name: 'test', address: '645b9e930702476379c8fcfc' }
        };
        await controller.createAuthor(request, res, next);
        expect(res.status).toHaveBeenCalledWith(201);
    });
    it('should update an Author', async () => {
        const request: any = {
            params: {
                authorId: '645b9e930702476379c8fcfc'
            },
            body: { name: 'Unit Test Update', address: 'Unit Test Update' }
        };
        await controller.updateAuthor(request, res, next);

        expect(res.status).toHaveBeenCalledWith(201);
    });
    it('should delete an Author', async () => {
        const request: any = {
            params: {
                authorId: '645b9e930702476379c8fcfc'
            }
        };
        await controller.deleteAuthor(request, res, next);

        expect(res.status).toHaveBeenCalledWith(201);
    });
});

describe('Author Controller Error handling', () => {
    it('should return an error for readAll', async () => {
        jest.spyOn(Author, 'find').mockRejectedValueOnce(new Error('Database connection error'));

        await controller.readAll(req, res, jest.fn());

        expect(res.status).toHaveBeenCalledWith(500);
    });
    it('should return an error for createAuthor', async () => {
        // jest.spyOn(controller, 'createAuthor').mockRejectedValueOnce(new Error('Database connection error'));
        const request: any = {
            body: { name: '', address: '' }
        };
        await controller.createAuthor(request, res, next);
        expect(res.status).toHaveBeenCalledWith(500);
    });
    it('should return an error for getAuthor', async () => {
        const request: any = {
            params: {
                id: ''
            }
        };
        await controller.readAuthor(request, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
    });
    it('should return an Error for updateAuthor', async () => {
        const request: any = {
            params: {
                id: ''
            }
        };
        await controller.updateAuthor(request, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
    });
});
