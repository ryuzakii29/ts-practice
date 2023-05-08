import Author from '../../models/Author';

describe('author model', () => {
    it('should have author name', () => {
        const author = new Author({
            name: 'Test'
        });

        // console.log(author);
    });
});
