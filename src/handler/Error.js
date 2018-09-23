const jfServerResponseJson    = require('jf-server/src/response/Json');
const jfServerRestHandlerBase = require('./Base');
/**
 * Maneja los errores antes de que algún handler pueda procesar la petición.
 *
 * @namespace jf.server.rest.handler
 * @class     jf.server.rest.handler.Error
 * @extends   jf.server.rest.handler.Base
 */
module.exports = class jfServerRestHandlerError extends jfServerRestHandlerBase
{
    /**
     * @override
     */
    _init(config)
    {
        this.response = new jfServerResponseJson(config);
    }
};
