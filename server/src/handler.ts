import { errorResponse, successfulResponse } from './responses';
import { createVent } from './repository';

exports.handler = async (event, context): Promise<any> => {
    console.log('I\'m in');
    console.log(event);

    try {
        if (!event.requestContext.authorizer) {
            return errorResponse(500, 'Authorization not configured', context.awsRequestId);
        }
        console.log(event.requestContext.authorizer)

        const MethodCalculator = {
            POST: createVent
        }

        let method = MethodCalculator[event.httpMethod]

        if (!method) {
            return errorResponse(400, 'that verb is not supported', context.awsRequestId);
        }

        let body = await method(JSON.parse(event.body));
        return successfulResponse(200, body);
    } catch (err) {
        console.log(err);

        return errorResponse(500, 'Something unexpected occurred: ' + err.message, context.awsRequestId);
    }
}