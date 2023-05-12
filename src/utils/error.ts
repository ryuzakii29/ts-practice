const Errors = {
    BadRequest: {
        MissingQueryParameter: {
            code: 400,
            reason: 'missingQueryParameter',
            message: 'The URI is missing a required query-string parameter',
            referenceError: ''
        },
        MissingQueryValue: {
            code: 400,
            reason: 'missingQueryValue',
            message: 'The URI is missing a required query-string parameter value',
            referenceError: ''
        },
        InvalidQuery: {
            code: 400,
            reason: 'invalidQuery',
            message: 'The query section of the URI is invalid.',
            referenceError: ''
        },
        InvalidBody: {
            code: 400,
            reason: 'invalidBody',
            message: 'The request has an invalid body',
            referenceError: ''
        }
    },
    Unauthorized: {
        MissingCredentials: {
            code: 401,
            reason: 'missingCredentials',
            message: 'No credentials provided.',
            referenceError: ''
        },
        InvalidCredentials: {
            code: 401,
            reason: 'invalidCredentials',
            message: 'Provided credentials are invalid or expired',
            referenceError: ''
        }
    },
    NotFound: {
        ZeroResults: {
            code: 404,
            reason: 'custom error: no match',
            message: 'No results found.',
            referenceError: ''
        }
    }
};

export class ErrorREST extends Error {
    public response: { status: number; message: string; detail: string; reason: string };

    constructor(error: { status: number; message: string; reason: string }, detail: any = undefined, ...args: any) {
        super(...args);
        this.response = { status: error.status, message: error.message, reason: error.reason, detail: detail };
    }
}
