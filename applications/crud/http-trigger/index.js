const { helloWorld } = require('ms-oss-example-common');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    context.log(helloWorld());
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: helloWorld()
    };
};