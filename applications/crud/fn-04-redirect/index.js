'use strict';

module.exports = async function(context) {
    context.res = {
        body: __filename,
    };
};
