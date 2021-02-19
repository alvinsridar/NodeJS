require('dotenv').config();
const mongoose = require('mongoose');

const db = process.env.DB_URL;

module.exports = async () => {
    await mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }, console.log('Connected to rba database.'));

    return (mongoose.connection);
};