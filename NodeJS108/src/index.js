const express = require('express');
const taskRoutes = require('../routes/task');

const app = express();

(async () => {
    try {
        app.listen(3000, console.log('Server listening on port 3000.'));
        app.use('/', taskRoutes);
    } catch (error) {
        console.error(error);
    }
})();