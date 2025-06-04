const http = require('http');
const port = 3000;

const server = http.createServer((req, res) => {
    res.write('hello, World!');
    res.end();
});

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});