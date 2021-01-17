const regexChalkRed = require('./regexChalkRed');

const fileName = process.argv[2].split('=')[1];
const stringToChalk = process.argv[3].split('=')[1];

regexChalkRed(stringToChalk, fileName);

console.log(`Chalked red all matches of ${stringToChalk} in ${fileName}`);