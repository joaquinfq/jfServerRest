if (!process.argv[3])
{
    process.argv[3] = '../www';
}
const start                  = require('jf-server/scripts/start');
start.handlers.jfServerError = require('../src/handler/Error');
start.register('GET', require('../src/handler/Get'));
start.register('POST', require('../src/handler/Post'));
