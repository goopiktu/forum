const http = require('http');

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    console.log("Request url:" + req.url);
});

server.listen(3000, '127.0.0.1', () => {
    console.log("Server listening...");
});


// console.log("HEllo>");