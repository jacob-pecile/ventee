import { v4 as uuidv4 } from 'uuid';
import { DynamoDB } from 'aws-sdk';
import {Tag, TagToVent} from '../types';
import { String } from 'aws-sdk/clients/acm';

const dynamoDB = new DynamoDB.DocumentClient();

export const updateTags = async (event): Promise<void> => {
    let tags = JSON.parse(event.body);
    console.log(tags);

    let userId = event.requestContext.authorizer.claims['sub'];
    console.log("ventId: " + event.pathParameters.ventId);

    let currentTags = await getTagByUser(event);
    let currentTagNames = currentTags.map(t => t.tagName);

    let newTags = tags.filter(tag => !currentTagNames.includes(tag.tagName));

    let batchActions = [];
    newTags.forEach(tag => {
        const tagId = uuidv4();
        batchActions.push({
            PutRequest: {
                Item: {
                    ...tag,
                    tagId,
                    createdById: userId
                }
            }
        }); 
        tag.tagId = tagId;
    });

    if (batchActions.length){
        await dynamoDB.batchWrite({RequestItems: {'Tags': batchActions}}, (err, data) => {
            if (err) {
                console.log("Error", err);
            } else {
                console.log("Success", data);
            }
        }).promise();
    };

    await updateVentToTag(tags.map(t => t.tagId), event.pathParameters.ventId);
}

const updateVentToTag = async (tagsIds: String[], ventId): Promise<void> => {
    console.log(tagsIds);
    let currentVentTags = await getTagsForVent(ventId);
    let currentVentedTagIds = currentVentTags.map(t => t.tagId);

    let newtagIds = tagsIds.filter(tagId => !currentVentedTagIds.includes(tagId));
    console.log(newtagIds);

    let batchActions = [];
    newtagIds.forEach(tagId => {
        batchActions.push({ 
            PutRequest:{
                Item: {
                    tagId: tagId,
                    ventId,
                    tagsToVentId: uuidv4()
                }
            }
        });
    });

    let oldTags =  currentVentTags.filter(tag => !tagsIds.includes(tag.tagId));
    console.log(oldTags);
    oldTags.forEach(oldTag => {
        batchActions.push({
            DeleteRequest: {
                Key: {tagsToVentId: oldTag.tagsToVentId},
                ConditionExpression: 'tagId = :tagId',
                ExpressionAttributeValues: {
                    ":tagId": oldTag.tagId
                }
            }
        });
    });
  
    console.log(batchActions);

    if (batchActions.length){
        await dynamoDB.batchWrite({RequestItems: {'TagsToVent': batchActions}}, (err, data) => {
            if (err) {
                console.log("Error", err);
            } else {
                console.log("Success", data);
            }
        }).promise();
    }
  
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
};

const getTagsForVent = async (ventId: String): Promise<TagToVent[]> => {
  
      let query = {
          TableName: 'TagsToVent',
          FilterExpression: `ventId = :ventId`,
          ExpressionAttributeValues: {
              ":ventId": ventId
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
  
      return result.Items as TagToVent[];
  }