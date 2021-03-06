require('dotenv').config();
const express = require('express');
const Task = require("../models/taskModel");
const jwt = require("jsonwebtoken");

const router = express.Router();

//middleware for jwt.verify on all task routes
router.use('/task', express.json(), (req, res, next) => {
    if (req.body.token) {
        jwt.verify(req.body.token, process.env.SECRET_KEY, (err, decodedToken) => {
            if (err) {
                throw Error('Invalid token.');    
            } else {
                req.context = decodedToken;
                next();
            }
        })
    } else {
        throw Error('No token provided.');
    }
})

//CREATE a new task
router.post('/task', express.json(), async (req, res, next) => {
    try {
        req.body.userId = req.context.payload;
        console.log(req.body);
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
    if (err.message === 'Invalid token.' || 'No token provided.') {
        res.status(401).send({err: err.message});
        return;
    }
    res.status(400).send({ err: err.message });
})

module.exports = router;