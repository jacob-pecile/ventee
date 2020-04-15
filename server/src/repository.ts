import { v4 as uuidv4 } from 'uuid';
import AWS from 'aws-sdk';
import { Vent } from './types';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const createVent = async (vent: Vent): Promise<void> => {
    const ventId = uuidv4();

    await dynamoDB.put({
        TableName: 'Vents',
        Item: {
            ...vent,
            ventId,
            timeOfCreation: (new Date()).getTime()
        }
    });

}