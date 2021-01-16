const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//create user object with empty values to hold input
let user = {
    name: '',
    age: '',
    gender: ''
};

//get user input save to corresponding property
rl.question('Enter name: ', nameInput => {
    user.name = nameInput;
    console.log(`User's name is ${user.name}.`);

    rl.question('Enter age: ', ageInput => {
        user.age = ageInput;
        console.log(`User's age is ${user.age}.`);

        rl.question('Enter gender: ', genderInput => {
            user.gender = genderInput;
            console.log(`User's gender is ${user.gender}.`);
            console.log(user);

            fs.writeFile('user.json', JSON.stringify(user), (err) => {
                if (err) throw err;
                console.log('User data has been saved.');

                rl.close();
            });
        });
    });
});