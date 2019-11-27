'use strict';
const { azureWrapper } = require('@bit/exigentcoder.common-modules.azure-functions');
const { convertContext } = require('../shared/convert-context');
const { create, deleteById, getById, replaceById, search } = require('../shared/domain/tasks');
const { runRequestForVerb } = require('ms-oss-example-common');

module.exports = azureWrapper(createTask, convertContext);

/** @type {import('@bit/exigentcoder.common-modules.azure-functions/azure-functions/types').RequestHandler} */
async function createTask({ req, context, logger }) {
    logger.info('About to call fn');
    return await runRequestForVerb({ context, req, logger, verbReqMap });
}

const verbReqMap = {
    GET: async ({ req, context, logger }) => {
        logger.info('V2 task api - Get');
        if (req.params.id) {
            return await getById({ id: req.params.id, context, logger });
        }
        const query = {}; //crudServices.mapQueryString(req.query);
        return await search({ query, context, logger });
    },
    POST: async ({ req, context, logger }) => {
        logger.info('V2 task api - Create');
        return await create({ entity: req.body, context, logger });
    },
    PUT: async ({ req, context, logger }) => {
        logger.info('V2 task api - Update');
        return await replaceById({ id: req.params.id, entity: req.body, context, logger });
    },
    DELETE: async ({ req, context, logger }) => {
        logger.info('V2 task api - Delete');
        return await deleteById({ id: req.params.id, context, logger });
    },
};
