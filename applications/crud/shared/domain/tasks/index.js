'use strict';
const { getDb, ObjectId } = require('../../mongodb');
const { inputValidator /* , outputValidator, createOutputMapper */ } = require('../../validation');
const { getSchema } = require('./schema');
const { createVersionInfoSetter } = require('@bit/exigentcoder.common-modules.version-info');
const { notFound } = require('@hapi/boom');
const collectionName = 'tasks';
//Simulate a shard key
const region = 'ZA';
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

async function create({ entity, context, logger }) {
    logger.info('Service - Create');
    initialise();
    ensureContextAuthorised('create', entity, context);
    /**@type {import('mongodb').Db} */
    const db = await getDb();
    const collection = db.collection(collectionName);
    entity = entity || {};
    entity.region = region;
    inputValidator.ensureValid(schemaId, entity);
    setVersionInfo(entity, context);
    await collection.insertOne(entity);
    return entity;
}

async function getById({ id, context, logger }) {
    logger.info('Service - Get by Id');
    initialise();
    ensureContextAuthorised('getById', id, context);
    /**@type {import('mongodb').Db} */
    const db = await getDb();
    const collection = db.collection(collectionName);
    return await collection.findOne({ _id: new ObjectId(id) });
}

async function deleteById({ id, context, logger }) {
    logger.info('Service - Delete by Id');
    initialise();
    ensureContextAuthorised('getById', id, context);
    /**@type {import('mongodb').Db} */
    const db = await getDb();
    const collection = db.collection(collectionName);
    const result = await collection.findOneAndDelete({ _id: new ObjectId(id), region });
    if (!result.value) {
        throw notFound(`No task with an id of ${id} was found`);
    }
    return result.value;
}
async function replaceById({ id, entity, context, logger }) {
    logger.info('Service - Replace by Id');
    initialise();
    ensureContextAuthorised('getById', id, context);
    const existingEntity = await getById({ id, context, logger });
    inputValidator.ensureValid(schemaId, entity);
    entity.versionInfo = existingEntity.versionInfo;
    entity.region = existingEntity.region;
    delete entity._id;
    setVersionInfo(entity, context);
    /**@type {import('mongodb').Db} */
    const db = await getDb();
    const collection = db.collection(collectionName);
    const result = await collection.findOneAndReplace({ _id: new ObjectId(id), region }, entity);
    return result.value;
}

async function search({ query, context, logger }) {
    logger.info('Service - Search');
    initialise();
    ensureContextAuthorised('getById', context);
    /**@type {import('mongodb').Db} */
    const db = await getDb();
    const collection = db.collection(collectionName);
    query = query || {};
    return await collection
        .find(query.filter)
        .skip(query.skip || 0)
        .limit(query.limit > 100 ? 100 : query.limit || 20)
        .sort(query.sort || { _id: 1 })
        .project(query.projection || null)
        .toArray();
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
