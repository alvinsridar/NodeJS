const express = require('express');
const Task = require("../models/taskModel");

const router = express.Router();

//CREATE a new task
router.post('/task', express.json(), async (req, res, next) => {
    try {
        const task = new Task(req.body);
        const savedTask = await task.save();
        res.status(201).send(savedTask);
    } catch (err) {
        next(err);
    }
});

//READ a task by id
router.get('/task/:id', express.json(), async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id)
        if (!task) {
            res.status(400).send(`No task with id:${req.params.id} found.`);
            return;
        }
        res.status(200).send(task);
    } catch (err) {
        next(err);
    }
});

//READ all tasks
router.get('/task', async (req, res, next) => {
    try {
        const tasks = await Task.find();
        if (tasks.length === 0) {
            res.status(200).send('No tasks in database.');
            return;
        }
        res.status(200).send(tasks);
        next();
    } catch (err) {
        next(err);
    }
});

//UPDATE a task by id
router.put('/task/:id', express.json(), async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            res.status(400).send(`No task with id:${req.params.id} found.`);
            return;
        };

        //update properties only if values are in req.body
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
    } catch (err) {
        next(err);
    }
});

//DELETE a task by id
router.delete('/task/:id', async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            res.status(400).send(`No task with id:${req.params.id} found.`);
            return;
        };
        await task.delete();
        res.status(200).send(`Task with id:${req.params.id} deleted.`);
    } catch (err) {
        next(err);
    }
});

//error handling middleware - router group level
router.use((err, req, res, next) => {
    console.error(err.message);
    res.status(400).send({err: err.message});
})

module.exports = router;