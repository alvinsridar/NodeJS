const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();

//GET for user, respond with URL query values
app.get('/user', (req, res) => {
    console.log(`Req URL: ${req.url}, Req method: ${req.method}`);

    //save query values
    const { name, age, gender } = req.query;
    console.log('GET:', name, age, gender);
    //respond with json of query values
    res.json({
        name: name,
        age: age,
        gender: gender
    });
});

//req.params vs req.query
//if path is /user/a?name=b
//req.params.name = a
//req.query.name = b

//POST for user, write req.body to json file
app.post('/user', express.json(), async(req, res) => {
    //store desired values from req.body
    const { name = '', age = '', gender = '' } = req.body;
    console.log('POST:', name, age, gender);

    //json object to write
    const userData = {
        name: name,
        age: age,
        gender: gender
    };

    //write to  user_data/posted.json
    await fs.writeFile(path.resolve(__dirname, '../user_data/posted.json'), JSON.stringify(userData));
    console.log('User data saved.');
    res.end();
});

//listen to user input port or default to 3000

//try not to use splice, especially with global object or system data such as process.argv
//It is better to assign it into another variable and modify it 
//rather than touching the original object

let argvInput = process.argv;
argvInput.splice(0, 2)
let selectPort;
argvInput[0] === undefined ? selectPort = 3000 : selectPort = argvInput[0].split('=')[1];
app.listen(selectPort, console.log(`Server started on port ${selectPort}`));