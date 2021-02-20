require('dotenv').config();
const mongoose = require('mongoose');

module.exports = async () => {
    await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }, console.log('Connected to rba database.'));

    async function handleShutdown() {
        mongoose.connection.close();
        console.log('Db connection closed.');
    };

    process.on('SIGINT', handleShutdown);
    process.on('SIGTERM', handleShutdown);

    return (mongoose.connection);
};