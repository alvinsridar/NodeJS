const fs = require('fs/promises');

const textA = async () => {
    try {
        const data = await fs.readFile('./a.txt');
        return data.toString();
    } catch (err) {
        console.error(err);
    };
};
const textB = async () => {
    try {
        const data = await fs.readFile('./b.txt');
        return data.toString();
    } catch (err) {
        console.error(err);
    };
};
const textC = async () => {
    try {
        const data = await fs.readFile('./c.txt');
        return data.toString();
    } catch (err) {
        console.error(err);
    };
};

const writeCompiled = async (data) => {
    try {
        fs.writeFile('d.txt', data);
    } catch (err) {
        console.error(err);
    }
}

let compiledText = '';

textA().then(data => {
    compiledText += ' ' + data.toUpperCase();
    return textB();
}).then(data => {
    compiledText += ' ' + data.toLowerCase();
    return textC();
}).then(data => {
    compiledText += ' ' + data.split('').reverse().join('');
    console.log(compiledText);
    return writeCompiled(compiledText);
});