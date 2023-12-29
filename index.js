// dependencies
const http = require('http');
const url = require('url');
const {StringDecoder} = require('string_decoder');

// app object - module scaffolding
const app = {}

// configuraion
app.config = {
    port: 3000,
}

// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);

    server.listen(app.config.port, () => {
        console.log(`server listen on port ${app.config.port}`)
    });
}

// handle request response
app.handleReqRes = (req, res) => {
    // request handling
    // get url and parse
    const parseUrl = url.parse(req.url, true);
    const path = parseUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parseUrl.query;
    const headerObject = req.headers;

    const decoder = new StringDecoder('utf-8');
    let realdata = '';

    req.on('data', (buffer) => {
        realdata += decoder.write(buffer)
    })

    req.on('end', () => {
        realdata += decoder.end();
        console.log(realdata)

        // response handle
        res.end('Hello ..')
    })
}

//start server
app.createServer();