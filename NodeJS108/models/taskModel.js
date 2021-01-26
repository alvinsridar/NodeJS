const mongoose = require('mongoose');
const TaskSchema = require('../schema/taskSchema');

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;