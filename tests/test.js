const chalk = require('chalk');

const array1 = [chalk.red('a'),'b',chalk.red('c')];
let array = [];

console.log(array1.join(''));

array = array + array1[0];
console.log(array);
array = array + array1[1];
console.log(array);
array = array + array1[2];
console.log(array);