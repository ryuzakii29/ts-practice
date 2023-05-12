import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { IAuthor } from '../models/Author';
import { IBook } from '../models/Book';
import { IGeographicAddress } from '../models/Request/GeographicAddressValidation';
import Logging from '../library/Logging';

export const ValidateJoi = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            Logging.error(error);

            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    addressValidation: {
        req: {
            query: Joi.object<IGeographicAddress>({
                buyerId: Joi.string().required(),
                sellerId: Joi.string().required(),
                provideAlternative: Joi.boolean(),
                authorizationCode: Joi.string().required()
            })
        }
    },
    author: {
        create: Joi.object<IAuthor>({
            name: Joi.string().required(),
            address: Joi.string()
        }),
        update: Joi.object<IAuthor>({
            name: Joi.string().required(),
            address: Joi.string()
        })
    },
    book: {
        create: Joi.object<IBook>({
            author: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            title: Joi.string().required()
        }),
        update: Joi.object<IBook>({
            author: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            title: Joi.string().required()
        })
    }
};
