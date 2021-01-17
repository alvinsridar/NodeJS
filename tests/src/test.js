const regex = new RegExp('M','ig');
const chalk = require('chalk');

const text = 'LoreM ipsum dolor sit aMet.';

const replaced = text.replace(regex,'splitMarker');
const matched = [...text.match(regex),''];
const splited = replaced.split('splitMarker');

const chalkedString = matched.map(str => {
    return chalk.red(str)
})

let stitched = [];

for (let i = 0; i < splited.length; i++) {
    stitched = stitched + splited[i] + chalkedString[i];
}

console.log(stitched);