const express = require('express');
const taskRoutes = require('../routes/task');
const userRoutes = require('../routes/user');
//const dbConnection = require('../utils/db');

const app = express();
app.use('/', taskRoutes);
app.use('/', userRoutes);

// (async () => {
//     try {
//         await dbConnection();
//         app.use('/', taskRoutes);
//         app.use('/', userRoutes);
//     } catch (err) {
//         console.error(err);
//     };
// })();

module.exports = app