const fs = require('fs');

let output = '';

new Promise((resolve, reject) => {
    fs.readFile('./testContent1.txt', (err, data) => {
        if(err) {
            reject(err);
            return;
        };
        resolve(data.toString());
    });
}).then(value => {
    output = value;
    console.log(output);

    return new Promise((resolve, reject) => {
        fs.readFile('./testContent2.txt', (err, data) => {
            resolve(data.toString());
        });
    });
}).then(value => {
    output = output + value;
    console.log(output);

    return new Promise((resolve, reject) => {
        fs.readFile('./testContent3.txt', (err, data) => {
            resolve(data.toString());
        });
    });
}).then(value => {
    output = output + value;
    console.log(output);
}).catch((err) => {
    console.error(`error is ${err.message}`);
});