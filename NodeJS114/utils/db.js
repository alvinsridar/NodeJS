require('dotenv').config();
const mongoose = require('mongoose');

async function dbConnection() {
    await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }, console.log('Connected to rba database.'));

    return (mongoose.connection);
};

module.exports = dbConnection;