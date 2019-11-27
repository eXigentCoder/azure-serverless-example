'use strict';

module.exports = { convertContext };
const packageJson = require('../package.json');
/**
 * @param {import('azure-functions-ts-essentials').Context} context
 * @returns {import('@bit/exigentcoder.common-modules.version-info/version-info/types').ExecutionContext}
 */
function convertContext(context) {
    const clientIp = (context.req.headers['client-ip'] || '').split(':')[0] || undefined;
    return {
        requestId: context.invocationId,
        codeVersion: packageJson.version,
        sourceIp: clientIp,
        source: 'Azure Fn App - Web Request',
        identity: {
            id: 'Some user or machine',
        },
    };
}
