'use strict';

module.exports = function() {
    return {
        mongoDb: {
            isCosmos: true,
            urlConfig: {},
            clientOptions: {
                useNewUrlParser: true,
                ssl: true,
            },
        },
    };
};
