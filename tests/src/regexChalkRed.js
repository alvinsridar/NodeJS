const fs = require('fs');
const chalk = require('chalk');

function regexChalkRed(stringToFind, contentPath) {

    //create regex from user input; global and case-insensitive
    const regex = new RegExp(stringToFind, 'gi')

    fs.readFile(contentPath,
        function (error, data) {

            //directly using replace() removes capitalization
            //to preserve capitalization, replace matches with marker, i.e. stringToFind
            const replaced = data.toString().replace(regex, stringToFind);

            //save matched pieces, which contain correct case, to matched array
            //add empty string element as last element to avoid undefined in for loop
            const matched = [...data.toString().match(regex), ''];

            //split replaced array by marker, i.e. stringToFind
            const splitted = replaced.split(stringToFind);

            //chalk matched pieces
            const chalkedString = matched.map(str => {
                return chalk.red(str)
            })

            //empty array for final result
            let chalked = [];

            //combine chalked pieces with split pieces
            for (let i = 0; i < splitted.length; i++) {
                chalked = chalked + splitted[i] + chalkedString[i];
            }

            console.log(chalked);
        }
    );
};
module.exports = regexChalkRed;