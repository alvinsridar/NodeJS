require('dotenv').config();
const express = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const emailer = require('../utils/emailer');

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
        await user.save();

        //respond with jwt after registration
        const payload = user._id;
        const token = jwt.sign({ payload }, process.env.SECRET_KEY, { expiresIn: '1h' });

        //set up email options
        const mailOptions = {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
            from: process.env.MAIL_USER,
            to: process.env.MAIL_USER,
            subject: 'New user signup',
            text: `Username:${req.body.username} \n UserID: ${payload}`
        };

        //send email
        emailer.sendEmail(mailOptions);

        res.status(201).send({token});
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
            const token = jwt.sign({ payload }, process.env.SECRET_KEY, { expiresIn: '1h' });
            res.status(200).send({token});
        };
    } catch (err) {
        next(err);
    }
});

//middleware for jwt.verify on view user, update user, upload avatar
router.use('/user/', express.json(), (req, res, next) => {
    //if token is provided, verify
    if (req.get('Authorization')) {
        jwt.verify(req.get('Authorization'), process.env.SECRET_KEY, (err, decodedToken) => {
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

//multer options
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/RBA/NodeJS/NodeJS113/avatars');
    },
    filename: (req, file, cb) => {
        const fileExtension = file.originalname.split('.')[1];
        cb(null, req.context.payload + '-avatar-' + Date.now() + '.' + fileExtension);
    }
});

//multer instance using defined options
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => { //error if mime type is not jpeg
        if (file.mimetype === 'image/jpeg') {
            cb(null, true);
        } else {
            cb(Error('Incorrect file type or size.'));
        };
    },
    limits: { //1mb size limit
        fileSize: 1024 * 1024
    }
});

router.use('/user/profile', express.static('avatars'));
//root directory does depend on where node is run
//jwt verify middleware will run before this, so req header must have token, or disable jwt verify middleware to test this
//view file: http://localhost:3000/user/profile/filename

//upload user avatar
router.post('/user/profile', upload.single('avatar'), express.json(), (req, res) => {
    if (req.file) {
        res.status(201).send(req.file);
    } else {
        throw Error('No file selected for upload.');
    }
})

//view user data by username
router.get('/user/:username', express.json(), async (req, res, next) => {
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
        res.status(401).send({ err: err.message });
        return;
    }
    res.status(400).send({ err: err.message });
})

module.exports = router;