import Book from '../../models/Book';
const joi = require('joi');

describe('book model', () => {
    it('should have title and author', () => {
        const book = new Book({
            title: 'Test',
            author: 'abc123'
        });
    });
});
