import { Response } from './types';

export const successfulResponse = (statusCode: number, body: any): Response => ({
    statusCode: statusCode,
    body: JSON.stringify(body),
    headers: {
        'Access-Control-Allow-Origin': '*',
    }
})

export const errorResponse = (statusCode, msg, awsRequestId): Response => ({
    statusCode: statusCode,
    body: JSON.stringify({
        Error: msg,
        Reference: awsRequestId,
    }),
    headers: {
        'Access-Control-Allow-Origin': '*',
    }
});