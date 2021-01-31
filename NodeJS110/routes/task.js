const express = require('express');
const Task = require("../models/taskModel");
const mongooseConnection = require('../utils/db');

const router = express.Router();

//CREATE a new task
router.post('/task', express.json(), async (req, res) => {
    try {
        const task = new Task(req.body);
        const savedTask = await task.save();
        res.status(201).send(savedTask);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error);
    }
});

//READ a task by id
router.get('/task/:id', express.json(), async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        if (!task) {
            res.status(400).send(`No task with id:${req.params.id} found.`);
            return;
        }
        res.status(200).send(task);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error);
    }
});

//READ all tasks
router.get('/task', async (req, res) => {
    try {
        const tasks = await Task.find();
        if (tasks.length === 0) {
            res.status(200).send('No tasks in database.');
            return;
        }
        res.status(200).send(tasks);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error);
    }
});

//UPDATE a task by id
router.put('/task/:id', express.json(), async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            res.status(400).send(`No task with id:${req.params.id} found.`);
            return;
        };

        //reassign only if values are in req.body
        if (!req.body.title) {
            task.title = req.body.title;
        };
        if (!req.body.due) {
            task.due = req.body.due
        };
        if (!req.body.done) {
            task.done = req.body.done
        };
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error);
    }
});

//DELETE a task by id
router.delete('/task/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            res.status(400).send(`No task with id:${req.params.id} found.`);
            return;
        };
        await task.delete();
        res.status(200).send(`Task with id:${req.params.id} deleted.`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error);
    }
});

module.exports = router;