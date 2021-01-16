const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb://localhost:27017');

async function main() {
    await client.connect();
    const db = client.db('rba');
    const collection = db.collection('nodejs107');

    console.log(collection);
}