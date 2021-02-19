require('dotenv').config();
const express = require('express');
const taskRoutes = require('../routes/task');
const userRoutes = require('../routes/user');
const dbConnection = require('../utils/db');

const app = express();

(async () => {
    try {
        await dbConnection();
        app.listen(process.env.DEFAULT_PORT, console.log('Server listening on port 3000.'));
        app.use('/', taskRoutes);
        app.use('/', userRoutes);
    } catch (error) {
        console.error(error);
    };
})();