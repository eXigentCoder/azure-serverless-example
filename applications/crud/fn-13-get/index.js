'use strict';
const { azureWrapper } = require('@bit/exigentcoder.common-modules.azure-functions');
const { convertContext } = require('../shared/convert-context');
const { getById, search } = require('../shared/domain/tasks');

module.exports = azureWrapper(createTask, convertContext);

/** @type {import('@bit/exigentcoder.common-modules.azure-functions/azure-functions/types').RequestHandler} */
async function createTask({ req, context, logger }) {
    logger.info('V1 task api - Get');
    if (req.params.id) {
        return await getById({ id: req.params.id, context, logger });
    }
    return search({ query: {}, context, logger });
}
