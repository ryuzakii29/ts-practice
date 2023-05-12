import { Request, Response, NextFunction } from 'express';

interface Error400 {
    description: string;
    reason: string;
    message: string;
    referenceError: string;
    code: 'missingQueryParameter' | 'missingQueryValue' | 'invalidQuery' | 'invalidBody';
}

interface Error401 {
    description: string;
    reason: string;
    message: string;
    referenceError: string;
    code: 'missingCredentials' | 'invalidCredentials';
}

interface Error403 {
    description: string;
    reason: string;
    message: string;
    referenceError: string;
    code: 'accessDenied' | 'forbiddenRequester' | 'tooManyUsers';
}

interface Error422 {
    description: string;
    reason: string;
    message: string;
    referenceError: string;
    code: 'missingProperty' | 'invalidValue' | 'invalidFormat' | 'referenceNotFound' | 'unexpectedProperty' | 'tooManyRecords' | 'otherIssue';
    propertyPath?: string;
}

interface Error500 {
    description: string;
    reason: string;
    message: string;
    referenceError: string;
    code: 'internalError';
}

type CustomError = Error400 | Error401 | Error403 | Error422 | Error500;

export function errorHandler(err: CustomError, req: Request, res: Response, next: NextFunction): void {
    let statusCode: number;
    let errorCode: string;
    let errorDescription: string;

    switch (err.code) {
        case 'missingQueryParameter':
            statusCode = 400;
            errorCode = 'missing_query_parameter';
            errorDescription = 'Missing required query parameter';
            return;
        case 'missingQueryValue':
            statusCode = 400;
            errorCode = 'missing_query_value';
            errorDescription = 'Missing required query parameter value';
            return;
        case 'invalidQuery':
            statusCode = 400;
            errorCode = 'invalid_query';
            errorDescription = 'Invalid query section of the URI';
            return;
        case 'invalidBody':
            statusCode = 400;
            errorCode = 'invalid_body';
            errorDescription = 'Invalid request body';
            return;
        case 'missingCredentials':
            statusCode = 401;
            errorCode = 'missing_credentials';
            errorDescription = 'Missing authentication credentials';
            return;
        case 'invalidCredentials':
            statusCode = 401;
            errorCode = 'invalid_credentials';
            errorDescription = 'Invalid or expired authentication credentials';
            return;
        case 'accessDenied':
            statusCode = 403;
            errorCode = 'access_denied';
            errorDescription = 'Access denied';
            return;
        case 'forbiddenRequester':
            statusCode = 403;
            errorCode = 'forbidden_requester';
            errorDescription = 'Forbidden requester';
            return;
        case 'tooManyUsers':
            statusCode = 403;
            errorCode = 'too_many_users';
            errorDescription = 'Too many users';
            return;
        case 'missingProperty':
            statusCode = 422;
            errorCode = 'missing_property';
            errorDescription = 'The property the Seller has expected is not present in the payload';
            return;
        case 'invalidValue':
            statusCode = 422;
            errorCode = 'invalid_value';
            errorDescription = 'The property has an incorrect value';
            return;
        case 'invalidFormat':
            statusCode = 422;
            errorCode = 'invalid_format';
            errorDescription = 'The property value does not comply with the expected value format';
            return;
        case 'referenceNotFound':
            statusCode = 422;
            errorCode = 'referenceNotFound';
            errorDescription = 'The object referenced by the property cannot be identified in the Seller system';
            return;
        case 'unexpectedProperty':
            statusCode = 422;
            errorCode = 'unexpected_Property';
            errorDescription = 'Additional property, not expected by the Seller has been provided';
            return;
        case 'tooManyRecords':
            statusCode = 422;
            errorCode = 'tooManyRecords';
            errorDescription = "the number of records to be provided in the response exceeds the Seller's threshold.";
            return;
        case 'otherIssue':
            statusCode = 422;
            errorCode = 'other_Issue';
            errorDescription = 'Other problem was identified (detailed information provided in a reason)';
            return;
        case 'internalError':
            statusCode = 500;
            errorCode = 'internalError';
            errorDescription = 'Internal server error - the server encountered an unexpected condition that prevented it from fulfilling the request.';
            return;
    }
}
