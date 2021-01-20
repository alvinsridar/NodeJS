const https = require('https');

const promiseRequest = (requestPath) => {
    return new Promise((resolve, reject) => {
        const req = https.request(requestPath, res => {
            let data = '';
            res.on('error', err => reject(err))
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                console.log('Status:',res.statusCode, res.statusMessage);
                const users = JSON.parse(data).data;
                resolve(users);
                console.log('resolved');
            });
        });
        req.end();
    });
};

(async () => {
    try {
        const users = await promiseRequest('https://reqres.in/api/users?page=2');
        users.forEach(user => {
            console.log(user.email);
        });
    } catch (error) {
        console.log(error);
    }
})();