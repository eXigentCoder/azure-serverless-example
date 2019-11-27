"use strict";

module.exports = function() {
    return {
        mongoDb: {
            isCosmos: false,
            urlConfig: {
                username: ``,
                password: ``,
                server: `localhost`,
                dbName: `ms-oss-${process.env.NODE_ENV}`
            },
            clientOptions: {
                useNewUrlParser: true,
                appname: `ms-oss-${process.env.NODE_ENV}`,
                ssl: false
            }
        }
    };
};
