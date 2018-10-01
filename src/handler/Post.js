const jfServerRestHandlerBase = require('./Base');
const path                    = require('path');

/**
 * Punto de entrada de las peticiones POST.
 *
 * @namespace jf.server.rest.handler
 * @class     jf.server.rest.handler.Post
 * @extends   jf.server.rest.handler.Base
 */
class jfServerRestHandlerPost extends jfServerRestHandlerBase
{
    /**
     * @override
     */
    async process()
    {
        let _error;
        const _directory = this.getFilename();
        const _pathname  = this.url.pathname;
        const _response  = this.response;
        const _storage   = this.storage;
        const _body = this.body;
        if (!_body)
        {
            _error = 400;
        }
        else if (this.isFile(_directory))
        {
            _error = 409;
        }
        else if (this.isFile(_storage.buildFilename(_pathname)))
        {
            _error = 409;
        }
        else
        {
            const _pKey     = this.request.headers['x-jfserver-id'] || '_id';
            const _id       = _body[_pKey] || (_storage.getLastId(_directory) + 1);
            const _filename = path.join(_directory, String(_id));
            if (!(_pKey in _body))
            {
                _body[_pKey] = _id;
            }
            const _created = _storage.create(_filename, _body);
            if (_created === false)
            {
                _error = 400;
            }
            else
            {
                if (_created)
                {
                    _response.setProperties(
                        {
                            data       : _body,
                            statusCode : 201
                        }
                    );
                    _response.headers.set('Location', _pathname + '/' + _id);
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

        return super.process();
    }
}

//------------------------------------------------------------------------------
jfServerRestHandlerPost.register();
module.exports = jfServerRestHandlerPost;
