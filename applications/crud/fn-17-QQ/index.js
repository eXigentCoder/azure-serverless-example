'use strict';

module.exports = function(context, queuePayload) {
    context.log({ queuePayload });
    context.done();
};
