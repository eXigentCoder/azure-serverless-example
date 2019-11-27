'use strict';
const { azureHttpWrapper } = require('ms-oss-example-common');
const { teapot, internal } = require('@hapi/boom');
let counter = 0;

module.exports = azureHttpWrapper(async function handledErrors({ logger }) {
    logger.info({ counter });
    counter++;
    const data = {
        someBool: true,
        someString: 'heya',
    };
    if (counter % 2 === 0) {
        throw internal('leeeeeEEEEeroy jenkins!!', data);
    } else {
        throw teapot('Yolo', data);
    }
});
