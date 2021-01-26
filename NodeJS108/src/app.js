const mongoose = require("mongoose");
const express = require('express');
const Task = require("../models/taskModel");

const app = express();
const db = 'mongodb://127.0.0.1:27017/rba';

(async () => {
    //connect to mongodb, rba database
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }, console.log('Connected to rba database.'));
        app.listen(3000, console.log('Server listening on port 3000.'));

        //CREATE a new task
        app.post('/task', express.json(), async (req, res) => {
            try {
                const task = new Task(req.body);
                const savedTask = await task.save();
                console.log(savedTask);
                res.send(`New task created: ${savedTask}`);
            } catch (error) {
                console.error(error.message);
                res.send(error);
            }
        });

        //READ a task by id
        app.get('/task/:id', express.json(), async (req, res) => {
            try {
                const task = await Task.findById(req.params.id)
                if (task === null) {
                    res.send(`No task with id:${req.params.id} found.`);
                    return;
                }
                res.send(task);
            } catch (error) {
                console.error(error.message);
                res.send(error);
            }
        });

        //READ all tasks
        app.get('/task', async (req, res) => {
            try {
                const tasks = await Task.find();
                res.send(tasks);
            } catch (error) {
                console.error(error.message);
                res.send(error);
            }
        });

        //UPDATE a task by id
        app.put('/task/:id', express.json(), async (req, res) => {
            try {
                const task = await Task.findById(req.params.id);

                if (task === null) {
                    res.send(`No task with id:${req.params.id} found.`);
                    return;
                };

                //reassign only if values are in req.body
                if (req.body.title !== undefined) {
                    task.title = req.body.title;
                };
                if (req.body.due !== undefined) {
                    task.due = req.body.due
                };
                if (req.body.done !== undefined) {
                    task.done = req.body.done
                };
                await task.save();
                res.send(`Task updated:${task}`);
            } catch (error) {
                console.error(error.message);
                res.send(error);
            }
        });

        //DELETE a task by id
        app.delete('/task/:id', async (req, res) => {
            try {
                const task = await Task.findById(req.params.id);

                if (task === null) {
                    res.send(`No task with id:${req.params.id} found.`);
                    return;
                };
                await task.delete();
                res.send(`Task with id:${req.params.id} deleted.`);
            } catch (error) {
                console.error(error.message);
                res.send(error);
            }
        });

    } catch (error) {
        console.error(error);
    }
})();