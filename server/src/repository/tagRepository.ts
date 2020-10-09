import { v4 as uuidv4 } from 'uuid';
import { DynamoDB } from 'aws-sdk';
import {Tag} from '../types';

const dynamoDB = new DynamoDB.DocumentClient();

export const createTag = async (event): Promise<void> => {
    let tag = JSON.parse(event.body);
    const tagId = uuidv4();

    let userId = event.requestContext.authorizer.claims['sub'];

    return dynamoDB.put({
        TableName: 'Tags',
        Item: {
            ...tag,
            tagId,
            createdById: userId
        }
    }).promise().then();
}

export const addVentToTag = async (event): Promise<void> => {
  let tagtoVents = JSON.parse(event.body);

  tagtoVents.forEach(tagtoVent => {
      dynamoDB.put({
        TableName: 'TagsToVent',
        Item: {
            ...tagtoVent
        }
    }).promise().then();
  });
  
}

export const getTagByUser = async (event): Promise<Tag[]> => {
  let userId = event.requestContext.authorizer.claims['sub'];

    let query = {
        TableName: 'Tags',
        FilterExpression: `createdById = :userId`,
        ExpressionAttributeValues: {
            ":userId": userId
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

    return result.Items as Tag[];
}