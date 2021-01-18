const fs = require('fs');

new Promise((resolve, reject) => {
    fs.readFile('./testContent1.txt', (err, data) => {
        if (err) {
            console.error(err);
            return;
        };
        resolve(data.toString());
    });
}).then((value) => {
    let text = value;

    new Promise((resolve, reject) => {
        fs.readFile('./testContent2.txt', (err, data) => {
            if (err) {
                console.error(err);
                return;
            };
            resolve(data.toString());
        });
    }).then((value) => {
        text = text.concat(value);

        new Promise((resolve, reject) => {
            fs.readFile('./testContent3.txt', (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                };
                resolve(data.toString());
            });
        }).then((value) => {
            text = text.concat(value);
            fs.writeFile('./compiledText.txt', text, () => {
                console.log('Compiled text saved.');
            })
        });
    });
});