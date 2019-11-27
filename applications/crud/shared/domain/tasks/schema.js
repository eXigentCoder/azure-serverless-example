'use strict';

module.exports = { getSchema };
const { jsonSchemas } = require('@bit/exigentcoder.common-modules.validation-mongodb');
const commonSchemas = require('@bit/exigentcoder.common-modules.json-schema');
const identitySchema = require('@bit/exigentcoder.common-modules.version-info/version-info/identity-schema');
function getSchema() {
    return {
        $id: 'https://ms-oss-crud.azurewebsites.net/api/entities/task',
        description: 'A task that needs doing',
        type: 'object',
        additionalProperties: false,
        properties: {
            _id: jsonSchemas.mongoDbObjectId(),
            title: {
                type: 'string',
                minLength: 1,
                pattern: '^[a-zA-Z0-9- ]+$',
            },
            region: {
                type: 'string',
                minLength: 1,
                pattern: '^[a-zA-Z0-9- ]+$',
            },
            versionInfo: {
                name: 'versionInfo',
                description:
                    "Information about the most recent changes to this object and it's creation info",
                type: ['object', 'null'],
                additionalProperties: false,
                properties: {
                    dateCreated: commonSchemas.dateTime,
                    versionTag: commonSchemas.uuid,
                    dateUpdated: commonSchemas.dateTime,
                    createdBy: identitySchema,
                    lastUpdatedBy: identitySchema,
                    updatedByRequestId: commonSchemas.nonEmptyString,
                    createdInVersion: commonSchemas.nonEmptyString,
                    updatedInVersion: commonSchemas.nonEmptyString,
                },
                required: [
                    'dateCreated',
                    'versionTag',
                    'dateUpdated',
                    'createdBy',
                    'lastUpdatedBy',
                    'updatedByRequestId',
                    'createdInVersion',
                    'updatedInVersion',
                ],
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
    };
}
