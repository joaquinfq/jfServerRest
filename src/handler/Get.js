const jfServerRestHandlerBase = require('./Base');
/**
 * Punto de entrada de las peticiones GET.
 *
 * @namespace jf.server.rest.handler
 * @class     jf.server.rest.handler.Get
 * @extends   jf.server.rest.handler.Base
 */
module.exports = class jfServerRestHandlerGet extends jfServerRestHandlerBase
{
    /**
     * @override
     */
    async process()
    {
        const _pathname = this.url.pathname;
        const _response = this.response;
        const _storage  = this.storage;
        let _data       = this.isDirectory(this.getFilename())
            ? _storage.retrieveAll(_pathname)
            : _storage.retrieve(_pathname);
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
        //
        return super.process();
    }
};
