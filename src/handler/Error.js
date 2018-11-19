const jfServerRestHandlerBase = require('./Base');
/**
 * Maneja los errores antes de que algún handler pueda procesar la petición.
 *
 * @namespace jf.server.rest.handler
 * @class     jf.server.rest.handler.Error
 * @extends   jf.server.rest.handler.Base
 */
class jfServerRestHandlerError extends jfServerRestHandlerBase
{
}
//------------------------------------------------------------------------------
jfServerRestHandlerError.register();
module.exports = jfServerRestHandlerError;
