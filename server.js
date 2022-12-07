const express = require('express');

const credentials = {
    user: 'pc',
    pass: 'PC@lux1'
}

function auth(req, res, next) {
    function send401() {
        res.writeHead(401, {"WWW-Authenticate" : "Basic"});
        res.end();
    }

    let authHeader = req.headers.authorization;

    if (!authHeader) {
        send401();
        return;
    }

    let auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
    let user = auth[0];
    let pass = auth[1];
    
    if (user == credentials.user && pass == credentials.pass) {
        next(); // all good
    } else send401();
}

let app = express()
    .use('/admin', auth)
    .use('/admin', (req, res, next)=>{
        res.send('authorized');
    })
    .use(express.static(__dirname + '/public'))
    .listen(3000);

console.log('listening on port 3000');