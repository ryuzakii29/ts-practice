import { NextFunction, Request, Response } from 'express';

const readLocation = (req: Request, res: Response, next: NextFunction) => {
    const key = process.env.GOOGLEMAPS_KEY;

    return Author.findById(authorId)
        .then((author) => (author ? res.status(200).json({ author }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};
