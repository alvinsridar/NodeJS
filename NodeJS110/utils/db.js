const mongoose = require('mongoose');

const db = 'mongodb://127.0.0.1:27017/rba';

module.exports = async () => {
    await mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }, console.log('Connected to rba database.'));

    return (mongoose.connection);
};