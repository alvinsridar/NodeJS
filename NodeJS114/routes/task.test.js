const jwt = require('jsonwebtoken');
const app = require('../utils/app');
const supertest = require('supertest');
//const Task = require('../models/taskModel');

jest.mock('../models/taskModel');

const request = supertest(app);

it('should call jwt.verify and read a mock task', async (done) => {

    //spy jwt.verify and mock with next()
    jest.spyOn(jwt, 'verify').mockImplementation((req, res, next) => {
        return next()
    });

    const res = await request
        .get('/task')
        .set({
            'Authorization': 'token'
        })

    expect(jwt.verify).toHaveBeenCalled();
    expect(res.status).toBe(200);
    expect(res.body).toEqual(
        {
            title: 'mock find task'
        }
    );
    done();
});