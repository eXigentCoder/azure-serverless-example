'use strict';
const { addMongoDbObjectId } = require('@bit/exigentcoder.common-modules.validation-mongodb');
const {
    createInputValidator,
    createOutputValidator,
    createOutputMapper,
} = require('@bit/exigentcoder.common-modules.validation');

const inputValidator = createInputValidator(addMongoDbObjectId);
const outputValidator = createOutputValidator(addMongoDbObjectId);

module.exports = {
    inputValidator,
    outputValidator,
    createOutputMapper,
};
