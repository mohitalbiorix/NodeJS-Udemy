const fs=  require('fs');

const requestHandler = (req,res)=>{

    const method = req.method;
    const url = req.url;

    if(url === '/'){
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if(url === '/message' && method === 'POST'){
        const body = [];
        req.on('data', (chunk)=>{
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', ()=>{
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split("=")[1];
            fs.writeFile('message.txt', message, ()=>{
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        })
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello! From my Node.js server</h1></body>');
    res.write('</html>');
    res.end();

    // process.exit(); /** for process exit */
}

// different types of we can exports

/* module.exports = requestHandler;

module.exports = {
    handler: requestHandler
} 

module.exports.handler = requestHandler;

*/

exports.handler = requestHandler;

