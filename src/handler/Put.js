const jfServerRestHandlerPatch = require('./Patch');

/**
 * Punto de entrada de las peticiones PUT.
 *
 * @namespace jf.server.rest.handler
 * @class     jf.server.rest.handler.Put
 * @extends   jf.server.rest.handler.Patch
 */
class jfServerRestHandlerPut extends jfServerRestHandlerPatch
{
    /**
     * @override
     */
    _update(pathname, data)
    {
        for (const _key of Object.keys(data))
        {
            if (_key !== '_id')
            {
                data[_key] = null;
            }
        }

        return super._update(pathname, data);
    }
}

//------------------------------------------------------------------------------
jfServerRestHandlerPut.register();
module.exports = jfServerRestHandlerPut;
