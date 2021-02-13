const express = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

//user signup
router.post('/user/signup', express.json(), async (req, res, next) => {
    try {
        //check if user exists
        const userRegistered = await User.findOne({ username: req.body.username })
        if (userRegistered) {
            throw Error('Username already exists.');
        };
        //save if user doesn't exist
        const user = new User(req.body);
        const newUser = await user.save();
        console.log(newUser);
        //respond with jwt after registration
        const payload = user._id;
        const token = jwt.sign({payload}, 'supersecretkey', {expiresIn: '1h'});
        res.status(201).send(token);
    } catch (err) {
        next(err);
    }
});

//user login
router.post('/user/login', express.json(), async (req, res, next) => {
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
    } catch (err) {
        next(err);
    }
});

//middleware for jwt.verify on view user and update user
router.use('/user/:username', express.json(), (req, res, next) => {
    //if token is provided, verify
    if (req.body.token) {
        jwt.verify(req.body.token, 'supersecretkey', (err, decodedToken) => {
            if (err) {
                throw Error('Invalid token.');
            } else { //if token is valid, save to req.context
                req.context = decodedToken;
                next();
            };
        });
    } else {
        throw Error('No token provided');
    };
});

//view user data by username
//cannot GET because GET doesn't have req.body
router.post('/user/:username', express.json(), async (req, res, next) => {
    try {
        //valid token, respond with user data if user exists and matches req.params
        const user = await User.findById(req.context.payload);
        if (!user || user.username !== req.params.username) {
            throw Error('User not found.');
        };
        res.status(200).send(user);
    } catch (err) {
        next(err);
    };
});

//update user data
router.put('/user/:username', express.json(), async (req, res, next) => {
    try {
        //valid token, if user exists and matches req.params, check for updated user data
        const user = await User.findById(req.context.payload);
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
    } catch (err) {
        next(err);
    };
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