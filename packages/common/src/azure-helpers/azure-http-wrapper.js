'use strict';
const { isBoom, boomify } = require('@hapi/boom');
module.exports = { azureHttpWrapper };

/**
 * @param {import('./types').RequestHandler} fn
 * @returns {import('./types').AzureWebRequest}
 */
function azureHttpWrapper(fn) {
    return _azureWrapper;
    /**
     * @param {import('./types').AzureContext} context
     * @param {import('./types').HttpRequest} req
     * @returns {Promise<import('./types').HttpResponse>}
     */
    async function _azureWrapper(context, req) {
        try {
            const result = await fn({
                context: context,
                req,
                logger: context.log,
            });
            return {
                status: 200,
                body: result,
            };
        } catch (err) {
            context.log.error(err);
            let boomErr;
            if (isBoom(err)) {
                boomErr = err;
                if (boomErr.data) {
                    //@ts-ignore
                    boomErr.output.payload.data = boomErr.data;
                }
            } else {
                boomErr = boomify(err, { statusCode: err.statusCode || 500 });
            }

            return {
                status: boomErr.output.statusCode,
                body: boomErr.output.payload,
                headers: boomErr.output.headers,
            };
        }
    }
}
