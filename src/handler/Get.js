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
        let _data;
        const _filename = this.getFilename();
        const _response = this.response;
        const _storage  = this.storage;
        if (this.isDirectory(_filename))
        {
            _data = this.adapter.apply(_storage.retrieveAll(this.url.pathname));
        }
        else if (this.isFile(_filename))
        {
            _data = _storage.retrieve(this.url.pathname);
        }
        else
        {
            const _extension = _storage.constructor.extension;
            if (_extension)
            {
                _data = _storage.retrieve(this.url.pathname + _extension);
            }
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
        //
        return super.process();
    }
};
