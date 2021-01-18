const fs = require('fs/promises');

(async () => {
    try {
        const textA = (await fs.readFile('./a.txt')).toString().toUpperCase();
        const textB = (await fs.readFile('./b.txt')).toString().toLowerCase();
        const textC = (await fs.readFile('./c.txt')).toString().split('').reverse().join('');
        const textD = textA + textB + textC;
        await fs.writeFile('./d.txt', textD.toString());
        console.log('File written.');
    } catch (err) {
        console.error(err);
    }
})();