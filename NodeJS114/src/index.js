const app = require('../utils/app');
const mongoose = require('mongoose');
const dbConnection = require('../utils/db');

(async () => {
    try {
        await dbConnection();
    } catch (err) {
        console.error(err)
    }
})();

const server = app.listen(process.env.DEFAULT_PORT, console.log('Server listening on port 3000.'));

async function handleShutdown() {
    server.close(async () => {
        console.log('Server closed.');
        await mongoose.connection.close();
        console.log('Db connection closed.')
        process.exit(0);
    });
}

process.on('SIGINT', handleShutdown);
process.on('SIGTERM', handleShutdown);