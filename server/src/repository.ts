import { v4 as uuidv4 } from 'uuid';
import { DynamoDB } from 'aws-sdk';
import { Vent } from './types';

const dynamoDB = new DynamoDB.DocumentClient();

export const createVent = async (vent: Vent): Promise<void> => {
    const ventId = uuidv4();

    return dynamoDB.put({
        TableName: 'Vents',
        Item: {
            ...vent,
            ventId,
            timeOfCreation: (new Date()).getTime()
        }
    }).promise().then();
}