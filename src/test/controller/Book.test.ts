import { Request, Response } from 'express';
import Book from '../../models/Book';
import controller from '../../controllers/Book';
import { db } from '../mongoose.unit';
db();

const req = {} as Request;
const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
} as unknown as Response;
const next = jest.fn();

describe('Book Controller', () => {
    it('should return all book', async () => {
        await controller.readAll(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
    });
    it('should return an book', async () => {
        const request: any = {
            params: {
                bookId: '645b9e930702476379c8fcfc'
            }
        };
        await controller.readBook(request, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
    });
    it('should save an book', async () => {
        const request: any = {
            body: { title: 'test', author: '645b9e930702476379c8fcfc' }
        };
        await controller.createBook(request, res, next);
        expect(res.status).toHaveBeenCalledWith(201);
    });
});
