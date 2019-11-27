'use strict';

module.exports = { getSchema };
const { jsonSchemas } = require('@bit/exigentcoder.common-modules.validation-mongodb');
function getSchema(){
    return {
        "$id": "https://ms-oss-crud.azurewebsites.net/api/entities/task",
        description: 'A task that needs doing',
        type: 'object',
        additionalProperties: false,
        properties: {
            _id: jsonSchemas.mongoDbObjectId(),
            title: {
                type: `string`,
                minLength: 1,
                pattern: "^[a-zA-Z0-9- ]+$",
            },
        },
        required: ['title'],
        errorMessage: {
            type: 'should be an object',
            required: {
                title: 'Must have "title" specified',
            },
            properties: {
                title:
                    'Title must be an alpha numeric value with of at least 1 character, spaces and dashes are alowed',
            },
        },
    }
}
