const app = require('../utils/app');
const supertest = require('supertest');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const emailer = require('../utils/emailer');
const request = supertest(app);

//before tests
beforeAll(async () => {
    //connect to test database
    await mongoose.connect(
        'mongodb://127.0.0.1:27017/test',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
    );
});

//after tests
afterAll(async () => {
    //delete all the users created during tests
    await User.deleteMany();
    await mongoose.connection.close();
});

it('saves testUser to test database and calls emailer.sendEmail', async (done) => {

    //emailer.sendEmail spy
    //mockImplementation replaces original logic
    jest.spyOn(emailer, 'sendEmail').mockImplementation(() => {
    });;

    const res = await request
        .post('/user/signup')
        .send({
            username: 'testUser',
            password: 'testUser',
            email: 'test@email.com'
        });

    const user = await User.findOne({ username: 'testUser' })

    //check status code
    expect(res.status).toBe(201);

    //check username exists in db
    expect(user.username).toBe('testUser');

    //check emailer function is called with non-null argument
    expect(emailer.sendEmail).toHaveBeenCalledWith(expect.anything());
    done();
});

it('logs in to testUser account', async (done) => {
    const res = await request
        .post('/user/login')
        .send({
            username: 'testUser',
            password: 'testUser'
        });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    done();
});