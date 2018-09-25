const jfServerRestHandlerBase = require('./Base');
/**
 * Punto de entrada de las peticiones PATCH.
 *
 * @namespace jf.server.rest.handler
 * @class     jf.server.rest.handler.Patch
 * @extends   jf.server.rest.handler.Base
 */
module.exports = class jfServerRestHandlerPatch extends jfServerRestHandlerBase
{
    /**
     * @override
     */
    async process()
    {
        let _error;
        const _body = this.body;
        if (this.isDirectory(this.getFilename()))
        {
            _error = 405;
        }
        else if (_body && typeof _body === 'object')
        {
            const _pathname = this.url.pathname;
            const _storage  = this.storage;
            let _data       = _storage.retrieve(_pathname);
            if (_data)
            {
                Object.assign(_data, _body);
                if (_storage.update(_pathname, _data))
                {
                    this.response.setProperties(
                        {
                            data       : Object.assign(_data, _body),
                            statusCode : 200
                        }
                    );
                }
                else
                {
                    _error = 500;
                }
            }
            else
            {
                _error = 404;
            }
        }
        else
        {
            _error = 400;
        }
        if (_error)
        {
            this.response.setError(
                {
                    statusCode : _error
                }
            );
        }
        //
        return super.process();
    }
};
