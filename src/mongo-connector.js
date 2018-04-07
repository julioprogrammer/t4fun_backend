const { MongoClient } = require('mongodb');

const MONGO_URL = 'mongodb://localhost:27017/t4fun';

module.exports = async () => {
    const db = await MongoClient.connect(MONGO_URL);

    return {
        Shows: db.collection('shows'),
        Tickets: db.collection('tickets'),
        Uploads: db.collection('uploads'),
    };
};
