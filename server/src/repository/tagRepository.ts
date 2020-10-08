import { v4 as uuidv4 } from 'uuid';
import { DynamoDB } from 'aws-sdk';

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