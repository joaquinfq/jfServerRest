const jfServerRestHandlerBase = require('./Base');

/**
 * Punto de entrada de las peticiones OPTIONS.
 *
 * @namespace jf.server.rest.handler
 * @class     jf.server.rest.handler.Options
 * @extends   jf.server.rest.handler.Base
 */
class jfServerRestHandlerOptions extends jfServerRestHandlerBase
{
    /**
     * @override
     */
    async process()
    {
        this.response.setProperties(
            {
                statusCode : 200
            }
        );

        return super.process();
    }
}

//------------------------------------------------------------------------------
jfServerRestHandlerOptions.register();
module.exports = jfServerRestHandlerOptions;
