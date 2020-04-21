import { v4 as uuidv4 } from 'uuid';
import { DynamoDB } from 'aws-sdk';
import { Vent } from './types';

const dynamoDB = new DynamoDB.DocumentClient();

export const createVent = async (event): Promise<void> => {
    let vent = JSON.parse(event.body);
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

export const getUserVents = async (event): Promise<Vent[]> => {

    let userName = event.requestContext.authorizer.claims['cognito:username'];

    let query = {
        TableName: 'Vents',
        FilterExpression: `userName = :userName`,
        ExpressionAttributeValues: {
            ":userName": userName
        }
    };

    const request = await dynamoDB.scan(query, (err, data) => {
        if (err) {
            console.log("unable to query. Error" + JSON.stringify(err, null, 2))
            return err;
        }

        return data;
    });

    const result = await request.promise();
    console.log(result);

    if (!result.Items) {
        throw result.$response.error;
    }

    return result.Items as Vent[];
}