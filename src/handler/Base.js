const jfServerHandlerBase = require('jf-server/src/handler/Base');
/**
 * Clase base para los manejadores del proyecto.
 *
 * @namespace jf.server.rest.handler
 * @class     jf.server.rest.handler.Base
 * @extends   jf.server.handler.Base
 */
module.exports = class jfServerRestHandlerBase extends jfServerHandlerBase
{
    /**
     * @override
     */
    static get extensions()
    {
        return ['*'];
    }
};
