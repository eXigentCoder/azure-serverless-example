'use strict';
const { azureWrapper } = require('@bit/exigentcoder.common-modules.azure-functions');
const { convertContext } = require('../shared/convert-context');
const { create } = require('../shared/domain/tasks');

module.exports = azureWrapper(createTask, convertContext);

/** @type {import('@bit/exigentcoder.common-modules.azure-functions/azure-functions/types').RequestHandler} */
async function createTask({ req, context, logger }) {
    logger.info('V1 task api - Create');
    return await create({ entity: req.body, context, logger });
}
