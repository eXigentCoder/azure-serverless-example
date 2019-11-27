'use strict';
const { getDb, ObjectId } = require('../../mongodb');
const { validators } = require('../../validation');
const { getSchema } = require('./schema');

const collectionName = 'tasks';

let schemaId;
function initialise() {
    if (schemaId) {
        return;
    }
    const schema = getSchema();
    const { inputValidator } = validators();
    inputValidator.addSchema(schema);
    schemaId = schema.$id;
}

async function create(entity, context) {
    initialise();
    ensureContextAuthorised('create', entity, context);
    /**@type {import('mongodb').Db} */
    const db = await getDb();
    const collection = db.collection(collectionName);
    entity = entity || {};
    entity._id = new ObjectId();
    const { inputValidator } = validators();
    inputValidator.ensureValid(schemaId, entity);
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
