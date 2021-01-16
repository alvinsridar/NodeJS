const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//create user object with empty values to hold input
const user = {};
let { name, age, gender } = user;

//get user input save to corresponding property
rl.question('Enter name: ', nameInput => {
    name = nameInput;
    console.log(`User's name is ${name}.`);

    rl.question('Enter age: ', ageInput => {
        age = ageInput;
        console.log(`User's age is ${age}.`);

        rl.question('Enter gender: ', genderInput => {
            gender = genderInput;
            console.log(`User's gender is ${gender}.`);

            fs.writeFile('user.json', JSON.stringify(user), (err) => {
                if (err) throw err;
                console.log('User data has been saved.')
            });

            rl.close();
        });
    });
});