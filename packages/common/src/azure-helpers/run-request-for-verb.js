'use strict';

const { methodNotAllowed } = require('@hapi/boom');

module.exports = { runRequestForVerb };
/**
 * @param {import('./types').Context} context
 * @param {import('./types').HttpRequest} req
 * @param {import('./types').VerbReqMap} verbReqMap
 * @returns
 */
async function runRequestForVerb({ context, req, logger, verbReqMap }) {
    validateVerbReqMap(verbReqMap);
    const requestsForVerb = verbReqMap[req.method.toUpperCase()];
    if (!requestsForVerb) {
        throw methodNotAllowed(`Method ${req.method} not supported.`);
    }
    return await requestsForVerb({ req, context, logger });
}

/** @param {import('./types').VerbReqMap} verbReqMap */
function validateVerbReqMap(verbReqMap) {
    Object.keys(verbReqMap).forEach(method => {
        const upperMethod = method.toUpperCase();
        if (method !== upperMethod) {
            verbReqMap[upperMethod] = verbReqMap[method];
            delete verbReqMap[method];
        }
    });
}
