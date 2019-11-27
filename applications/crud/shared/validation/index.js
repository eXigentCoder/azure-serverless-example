'use strict';
const { addMongoId } = require('@bit/exigentcoder.common-modules.validation-mongodb');
const {
    createInputValidator,
    createOutputValidator,
    createOutputMapper,
} = require('@bit/exigentcoder.common-modules.validation');

let inputValidator;
let outputValidator;

module.exports = {
    validators,
    createOutputMapper,
};

function validators() {
    if (!inputValidator) {
        inputValidator = createInputValidator(addMongoId);
    }
    if (!outputValidator) {
        outputValidator = createOutputValidator(addMongoId);
    }
    return {
        inputValidator,
        outputValidator,
    };
}
