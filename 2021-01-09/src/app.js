//fs.writeFile

//take user input: name, age, gender

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//create empty object to hold use input
let user = {};

//request name
process.stdout.write('Enter your name: ');

rl.on(
    //line event is triggered by Enter key
    'line', (name) => {
        user.name = name;
        console.log(`Your name is ${user.name}.`);

        process.stdout.write('Enter your age: ');
    }
);

rl.on(
    'pause', ()=>{
        console.log('paused');
    }
);

