const fs = require('fs');
const chalk = require('chalk');

function findAndChalkRed(stringToFind, contentPath) {

    const stringToFindUpper = stringToFind.toUpperCase();
    const stringToFindLower = stringToFind.toLowerCase();
    //to include upper and lower case in search

    fs.readFile(contentPath,
        function (error, data) {
            const splitText = data.toString().split('');
            //split string into single characters, including whitespace

            const chalkedText = splitText.map(
                (char) => {
                    return char === `${stringToFindUpper}` ? chalk.red(char)
                            : char === `${stringToFindLower}` ? chalk.red(char)
                                : char;
                    //if array element = stringToFind case-insensitive, return chalked element
                }
            );
            console.log(chalkedText.join(''));
        }
    );
};
module.exports = findAndChalkRed;

//split string into individual characters, including whitespace
//save split result as an array
//foreach(character) {if (string='a'), return chalk.red(character), else return character}
//recombine all the array elements
//console.log(output)