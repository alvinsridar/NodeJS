const fs = require('fs/promises');

(async () => {
    const textA = await (await fs.readFile('./a.txt')).toString().toUpperCase();
    const textB = await (await fs.readFile('./b.txt')).toString().toLowerCase();
    const textC = await (await fs.readFile('./c.txt')).toString().split('').reverse().join('');

    const textD = textA + textB + textC;

    await fs.writeFile('./d.txt', textD.toString());
    console.log(textD);
})();