const express = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

//POST - user sign up
router.post('/user/signup', express.json(), async (req, res) => {
    try {
        //check if user exists
        const userRegistered = await User.findOne({ username: req.body.username })
        if (userRegistered) {
            throw Error('Username already exists.');
        };
        const user = new User(req.body);
        const newUser = await user.save();
        res.status(201).send(newUser);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error);
    }
});

//POST - user log in
router.post('/user/login', express.json(), async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!user || !validPassword) {
            throw Error('Invalid user and password.')
        } else {
            //respond with jwt
            const payload = user._id;
            //secretkey should come from env
            const token = jwt.sign({ payload }, 'supersecretkey', { expiresIn: '1h' });
            res.status(200).send(token);
        };
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error);
    }
});

//POST - view user data by username
//cannot GET because GET doesn't have req.body
router.post('/user/:username', express.json(), async (req, res) => {
    try {
        //check for jwt
        if (req.body.token) {
            jwt.verify(req.body.token, 'supersecretkey', async (err, decodedToken) => {
                try {
                    if (err) {
                        //invalid token
                        throw Error('Invalid token.');
                    } else {
                        //valid token, respond with user data if user exists and matches req.params
                        const user = await User.findById(decodedToken.payload);
                        if (!user || user.username !== req.params.username) {
                            throw Error('User not found.');
                        };
                        res.status(200).send(user);
                    };
                } catch (error) {
                    console.error(error.message);
                    res.status(400).send(error);
                };
            })
        } else {
            throw Error('No token provided.')
        };
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error);
    };
});

//PUT - update user data
router.put('/user/:username', express.json(), async (req, res) => {
    try {
        //check for jwt
        if (req.body.token) {
            jwt.verify(req.body.token, 'supersecretkey', async (err, decodedToken) => {
                try {
                    if (err) {
                        //invalid token
                        throw Error('Invalid token.');
                    } else {
                        //valid token, respond with user data if user exists and matches req.params
                        const user = await User.findById(decodedToken.payload);
                        if (!user || user.username !== req.params.username) {
                            throw Error('User not found.');
                        };
                        //check for changes
                        if (user.username !== req.body.username) {
                            user.username = req.body.username;
                        };
                        if (await bcrypt.compare(req.body.password, user.password)) {
                            user.password = req.body.password;
                            //password hash changes upon save(), even if clear text password doesn't change
                        };
                        if (user.email !== req.body.email) {
                            user.email = req.body.email;
                        };
                        //save() updated user
                        await user.save()
                        res.status(200).send(user);
                    };
                } catch (error) {
                    console.error(error.message);
                    res.status(400).send(error);
                };
            })
        } else {
            throw Error('No token provided.')
        };
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error);
    }
});

module.exports = router;