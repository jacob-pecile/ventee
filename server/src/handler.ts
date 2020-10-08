import { errorResponse, successfulResponse } from './responses';
import { createVent, getUserVents } from './repository/ventRepository';
import { createTag, addVentToTag } from './repository/tagRepository';

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
            'POST/tag': createTag,
            'POST/tagToVent': addVentToTag,
        }

        let method = MethodCalculator[event.httpMethod + event.path]

        if (!method) {
            return errorResponse(400, 'that verb is not supported', context.awsRequestId);
        }

        let body = await method(event);
        return successfulResponse(200, body);
    } catch (err) {
        console.log(err);

        return errorResponse(500, 'Something unexpected occurred: ' + err.message, context.awsRequestId);
    }
}