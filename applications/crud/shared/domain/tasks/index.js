'use strict';
const { getDb } = require('../../mongodb');
const { inputValidator /* , outputValidator, createOutputMapper */ } = require('../../validation');
const { getSchema } = require('./schema');
const { createVersionInfoSetter } = require('@bit/exigentcoder.common-modules.version-info');
const collectionName = 'tasks';

let schemaId;
let setVersionInfo;
function initialise() {
    if (schemaId) {
        return;
    }
    const schema = getSchema();
    inputValidator.addSchema(schema);
    schemaId = schema.$id;
    //options.metadata.identifier.pathToId
    setVersionInfo = createVersionInfoSetter({
        validator: inputValidator,
        metadata: { identifier: { pathToId: '_id' } },
    });
}

async function create(entity, context) {
    initialise();
    ensureContextAuthorised('create', entity, context);
    /**@type {import('mongodb').Db} */
    const db = await getDb();
    const collection = db.collection(collectionName);
    entity = entity || {};
    entity.region = 'ZA';
    inputValidator.ensureValid(schemaId, entity);
    setVersionInfo(entity, context);
    await collection.insertOne(entity);
    return entity;
}

async function getById(id, context) {
    initialise();
    ensureContextAuthorised('getById', id, context);
}

async function deleteById(id, context) {
    initialise();
    ensureContextAuthorised('getById', id, context);
}
async function replaceById(id, context) {
    initialise();
    ensureContextAuthorised('getById', id, context);
}

async function search(id, context) {
    initialise();
    ensureContextAuthorised('getById', id, context);
}

function ensureContextAuthorised() {
    console.warn('todo implement');
}

module.exports = {
    create,
    getById,
    deleteById,
    replaceById,
    search,
};
