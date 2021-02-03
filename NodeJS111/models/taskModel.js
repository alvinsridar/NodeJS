const mongoose = require('mongoose');
const taskSchema = require('../schema/taskSchema');

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;