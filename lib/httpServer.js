/**
 * Module dependencies.
 */

const debug = require('debug')('server:server');
const http = require('http');

/**
 * Variable and get port from environment.
 */

const port = normalizePort(process.env.PORT || '3000');
let server;

/**
 * Create HTTP server.
 */

const createHttpServer = function(app) {
    app.set('port', port);
    server = http.createServer(app);
    server.listen(port,()=>{
        console.log('HTTP Server Listen on port：',port, ', on all network interfaces');
    });
    server.on('error', onError);
    server.on('listening', onListening);
}

/**
 * HTTP Server Function
 */

// Normalize a port into a number, string, or false.
function normalizePort(val) {
    var port = parseInt(val, 10);
    // named pipe
    if (isNaN(port)) {
        return val;
    }
    // port number
    if (port >= 0) {
        return port;
    }
    return false;
}
// Event listener for HTTP server "error" event.
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
// Event listener for HTTP server "listening" event.
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

module.exports = {
    createHttpServer
};