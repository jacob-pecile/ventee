import { errorResponse, successfulResponse } from './responses';
import { createVent, getUserVents } from './repository/ventRepository';
import { updateTags, getTagByUser } from './repository/tagRepository';

exports.handler = async (event, context): Promise<any> => {
    console.log('I\'m in');
    console.log(event);
    console.log(context);

    try {
        if (!event.requestContext.authorizer) {
            return errorResponse(500, 'Authorization not configured', context.awsRequestId);
        }
        console.log(event.requestContext.authorizer)

        const MethodCalculator = {
            'POST/vent': createVent,
            'GET/vent': getUserVents,
            'GET/tag': getTagByUser,
            'POST/tag/{ventId}': updateTags
        }

        let method = MethodCalculator[event.httpMethod + event.resource]

        if (!method) {
            return errorResponse(404, '', context.awsRequestId);
        }

        let body = await method(event);
        return successfulResponse(200, body);
    } catch (err) {
        console.log(err);

        return errorResponse(500, 'Something unexpected occurred: ' + err.message, context.awsRequestId);
    }
}