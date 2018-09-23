const jfServerRestHandlerBase = require('./Base');
const path                    = require('path');
/**
 * Punto de entrada de las peticiones POST.
 *
 * @namespace jf.server.rest.handler
 * @class     jf.server.rest.handler.Post
 * @extends   jf.server.rest.handler.Base
 */
module.exports = class jfServerRestHandlerPost extends jfServerRestHandlerBase
{
    /**
     * @override
     */
    async process()
    {
        let _error      = 400;
        let _directory  = this.getFilename();
        const _response = this.response;
        const _storage  = this.storage;
        if (!this.isFile(_directory))
        {
            const _body = this.body;
            if (_body)
            {
                const _pKey   = this.request.headers['x-jfserver-id'] || '_id';
                const _id     = _body[_pKey] || (_storage.getLastId(_directory) + 1);
                let _filename = path.join(_directory, String(_id)) + _storage.constructor.extension;
                if (!(_pKey in _body))
                {
                    _body[_pKey] = _id;
                }
                if (_storage.create(_filename, _body))
                {
                    _error = false;
                    _response.setProperties(
                        {
                            data       : _body,
                            statusCode : 200
                        }
                    );
                    _response.headers.set('Location', this.url.pathname + '/' + _id);
                }
                else
                {
                    _error = 500;
                }
            }
        }
        if (_error)
        {
            _response.setError(
                {
                    statusCode : _error
                }
            );
        }
        //
        return super.process();
    }
};
