const jfServerRestHandlerBase = require('./Base');
/**
 * Punto de entrada de las peticiones GET.
 *
 * @namespace jf.server.rest.handler
 * @class     jf.server.rest.handler.Get
 * @extends   jf.server.rest.handler.Base
 */
class jfServerRestHandlerGet extends jfServerRestHandlerBase
{
    /**
     * @override
     */
    async process()
    {
        let _data;
        const _pathname = this.url.pathname;
        const _response = this.response;
        const _storage  = this.storage;
        if (this.isFile(_storage.buildFilename(_pathname)))
        {
            _data = _storage.retrieve(_pathname);
        }
        else if (this.isDirectory(_storage.buildFilename(_pathname, false)))
        {
            _data = _storage.retrieveAll(_pathname);
        }
        if (_data)
        {
            _response.setProperties(
                {
                    data       : _data,
                    statusCode : 200
                }
            );
        }
        else
        {
            _response.setError(
                {
                    statusCode : 404
                }
            );
        }

        return super.process();
    }
}

//------------------------------------------------------------------------------
jfServerRestHandlerGet.register();
module.exports = jfServerRestHandlerGet;
