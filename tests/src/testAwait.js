const fs = require('fs/promises');

const text1 = async () => {
    try {
        const data = await fs.readFile('./testContent1.txt');
        return data.toString();
    } catch (err) {
        console.error(err);
    };
};
const text2 = async () => {
    try {
        const data = await fs.readFile('./testContent2.txt');
        return data.toString();
    } catch (err) {
        console.error(err);
    };
};
const text3 = async () => {
    try {
        const data = await fs.readFile('./testContent3.txt');
        return data.toString();
    } catch (err) {
        console.error(err);
    };
};

const writeCompiled = async (data) => {
    try {
        fs.writeFile('compiledText.txt', data);
    } catch (err) {
        console.error(err);
    }
}

let compiledText = '';

text1().then(data => {
    compiledText += data.toUpperCase();
    return text2();
}).then(data => {
    compiledText += data.toLowerCase();
    return text3();
}).then(data => {
    compiledText += data.split('').reverse().join('');
    console.log(compiledText);
    return writeCompiled(compiledText);
});