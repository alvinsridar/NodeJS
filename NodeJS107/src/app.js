const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const client = new MongoClient('mongodb://127.0.0.1:27017', { useUnifiedTopology: true, useNewUrlParser: true });

(async () => {
    //connect to mongodb, choose db and collection
    await client.connect();
    console.log('Connected to db.');
    const db = client.db('rba');
    const tasksCollection = db.collection('tasks');

    //read a task from tasksCollection based on ObjectId
    app.get('/task/:id', async (req, res) => {
        try {
            const idToFind = req.params.id;
            const result = await tasksCollection.findOne({ _id: ObjectId(idToFind) });
            if (result === null) {
                res.send(`No object with id ${idToFind}.`)
                return;
            };
            res.send(result);
        } catch (error) {
            console.error(error)
            res.send(error.message);
        }
    });

    //read all tasks from tasksCollection
    app.get('/task', async (req, res) => {
        try {
            const result = await tasksCollection.find().toArray();
            res.send(result);
        } catch (error) {
            console.error(error);
            res.send(error.message);
        }
    });

    //create new task in tasksCollection
    app.post('/task', express.json(), async (req, res) => {
        try {
            const { newTask } = req.body;
            if(newTask === undefined) {
                res.send('newTask property in request body is undefined.');
                return;
            };
            await tasksCollection.insertOne({ title: newTask });
            res.send('New task created.');
        } catch (error) {
            console.error(error);
            res.send(error.message);
        }
    });

    //update a task in tasksCollection based on ObjectId
    //updates the status property of an existing task
    app.put('/task/:id', express.json(), async (req, res) => {
        try {
            const idToUpdate = req.params.id;
            const { updateTask } = req.body;
            if(updateTask === undefined) {
                res.send('updateTask property in request body is undefined.')
                return;
            }
            const results = await tasksCollection.updateOne({ _id: ObjectId(idToUpdate) }, { $set: { status: updateTask } });
            if (results.modifiedCount === 0) {
                res.send(`No object with id ${idToUpdate}.`);
                return;
            };
            res.send(`${idToUpdate} updated.`);
        } catch (error) {
            console.error(error);
            res.send(error.message);
        }
    });

    //delete a task in tasksCollection based on ObjectId
    app.delete('/task/:id', async (req, res) => {
        try {
            const idToDelete = req.params.id;
            const results = await tasksCollection.deleteOne({ _id: ObjectId(idToDelete) });
            if (results.deletedCount === 0) {
                res.send(`No object with id ${idToDelete}.`)
                return;
            };
            res.send(`${idToDelete} deleted.`);
        } catch (error) {
            console.error(error)
            res.send(error.message);
        }
    });

    app.listen(3000, console.log('Server listening on port 3000.'));
})();