import { v4 as uuidv4 } from 'uuid';
import { DynamoDB } from 'aws-sdk';
import {Tag} from '../types';

const dynamoDB = new DynamoDB.DocumentClient();

export const updateTags = async (event): Promise<void> => {
    let tags = JSON.parse(event.body);

    let userId = event.requestContext.authorizer.claims['sub'];
    console.log("ventId: " + event.pathParameters.ventId);

    let currentTags = await getTagByUser(event);
    let currentTagNames = currentTags.map(t => t.tagName);

    let newTags = tags.filter(tag => !currentTagNames.includes(tag.tagName))

    let newTagsIds = [];
    newTags.forEach(tag => {
        const tagId = uuidv4();
        dynamoDB.put({
            TableName: 'Tags',
            Item: {
                ...tag,
                tagId,
                createdById: userId
            }
        }).promise().then(); 
        newTagsIds.push(tagId);
    });

    let tagNames = tags.map(t => t.tagName);
    let oldTags = currentTags.filter(tag => !tagNames.includes(tag.tagName))
    updateVentToTag(newTagsIds, oldTags, event.pathParameters.ventId);
}

const updateVentToTag = async (newTagsIds: String[], oldTags: Tag[], ventId): Promise<void> => {
    let newtagtoVents = newTagsIds.map(tagId => ({
        tagId: tagId,
        ventId
    }));
    console.log(newtagtoVents);

    newtagtoVents.forEach(tagtoVent => {
      dynamoDB.put({
        TableName: 'TagsToVent',
        Item: {
            ...tagtoVent
        }
     }).promise().then();
    });

    oldTags.forEach(oldTag => {
        dynamoDB.delete({
          TableName: 'TagsToVent',
          Key: ventId,
          ConditionExpression: 'tagId = :tagId',
          ExpressionAttributeValues: {
            ":tagId": oldTag.tagId
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