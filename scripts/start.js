const resolve = require('path').resolve;
if (!process.argv[3])
{
    process.argv[3] = resolve(__dirname, '..', 'www');
}
const server                  = require('jf-server/scripts/start');
server.handlers.jfServerError = require('../src/handler/Error');
server.registerFromDir(resolve(__dirname, '..', 'src', 'handler'));

module.exports = server;
