'use strict';

const ObjectId = require('mongodb').ObjectId;
const { getDb: _getDb, close } = require('@bit/exigentcoder.common-modules.mongodb');
const config = require('../config');

async function getDb() {
    const mongoConfig = config.get('mongoDb');
    return await _getDb(mongoConfig.urlConfig, mongoConfig.clientOptions);
}

module.exports = {
    getDb,
    close,
    ObjectId,
};
