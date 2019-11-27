'use strict';

let counter = 0;
/**
 * @param {import('azure-functions-ts-essentials').Context} context
 */
module.exports = async function(context) {
    context.log.info({ counter });
    counter++;
    if (counter % 2 === 0) {
        throw new Error('leeeeeEEEEeroy jenkins!!');
    } else {
        return Promise.reject(new Error('delayed leeeeeEEEEeroy jenkins!!'));
    }
};
