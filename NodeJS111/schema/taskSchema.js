const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    due: {
        type: Date,
        default: (new Date()),
    },
    done: {
        type: Boolean,
        default: false,
    }
});

module.exports = taskSchema;