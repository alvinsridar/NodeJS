//Using require()
const result = require('./src/test-require-file');
//this runs the code in test-require-file

console.log(result);
//this only prints the module.exports from test-require-file


//Using NPM module
//chalk colors the console.log output
const chalk = require('chalk');
console.log(chalk.bgGrey.blueBright('bright blue on grey'));

//Using fs
const fs = require('fs');

//read the content from content.txt
fs.readFile('./src/content.txt',
function (err, data) {
    console.log(chalk.bgGrey.blueBright(data.toString()));
});