const resolve = require('path').resolve;
if (!process.argv[3])
{
    process.argv[3] = resolve(__dirname, '..', 'www');
}
require('jf-server/src/handler/Base').logNameLength = 18;
require('jf-server/scripts/start');
// Cargamos las clases para que se registren en la factoría.
require('jf-file-system').i().scandir(resolve(__dirname, '..', 'src', 'handler')).forEach(require);
require('jf-server/src/adapter/Json');
require('jf-server/src/response/Json');
require('jf-server/src/storage/Json');
