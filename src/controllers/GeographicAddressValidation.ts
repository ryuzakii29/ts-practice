import { NextFunction, Request, Response } from 'express';
import googleValidate from '../utils/googleAddressValidation';

const validateAddress = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    const buyerId: any = req.query.buyerId;
    const sellerId: any = req.query.sellerId;
    if (!buyerId || !sellerId || !body.submittedGeographicAddress.city) {
        res.status(400).json({ error: { code: '400', reason: 'missingQueryValue', message: 'The URI is missing a required query-string parameter value' } });
    }
    const provideAlternative: boolean = req.query.provideAlternative ? true : false;

    const address = `${body.submittedGeographicAddress.streetNr || ''}${body.submittedGeographicAddress.streetNrLast || ''}${body.submittedGeographicAddress.streetNrSuffix || ''} ${
        body.submittedGeographicAddress.streetName || ''
    } ${body.submittedGeographicAddress.streetSuffix || ''}, ${body.submittedGeographicAddress.locality || ''} ${body.submittedGeographicAddress.postcode || ''} ${
        body.submittedGeographicAddress.city || ''
    }, ${body.submittedGeographicAddress.stateOrProvince || ''}, ${body.submittedGeographicAddress.country || ''}`;

    await googleValidate(address)
        .then((address) => {
            var examples = {
                'application/json': {
                    validationResult: 'success',
                    ...address,
                    provideAlternative
                }
            };
            return res.status(200).json(examples['application/json']);
        })
        .catch((err) => {
            return err;
        });
};

export default { validateAddress };
