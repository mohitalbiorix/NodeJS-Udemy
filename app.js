const http = require('http');
const route = require('./routes');


// create server using node 
const server = http.createServer(route.handler);


/** server run on 3000 port */
server.listen(3000);