const fs = require('fs');

fs.readFile('./testContent1.txt', (err, data) => {
    const text1 = data.toString();
    //console.log(text1);

    fs.readFile('./testContent2.txt', (err, data) => {
        const text2 = data.toString();
        //console.log(text2);

        fs.readFile('./testContent3.txt', (err, data) => {
            const text3 = data.toString();
            //console.log(text3);

            compiledText = text1.concat(text2, text3);

            fs.writeFile('./compiledText.txt', compiledText, (err) => {
               console.log('Compiled text saved.') ;
            });
        });
    });
});

