'use strict';
module.exports = {
    ...require('./azure-helpers'),
    helloWorld,
};

function helloWorld() {
    return 'Hello World!!';
}
