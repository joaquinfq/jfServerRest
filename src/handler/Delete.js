const jfServerRestHandlerBase = require('./Base');
const path                    = require('path');

/**
 * Punto de entrada de las peticiones DELETE.
 *
 * @namespace jf.server.rest.handler
 * @class     jf.server.rest.handler.Delete
 * @extends   jf.server.rest.handler.Base
 */
class jfServerRestHandlerDelete extends jfServerRestHandlerBase
{
    /**
     * @override
     */
    async process()
    {
        let _error;
        if (this.body)
        {
            // DELETE no acepta body
            _error = 400;
        }
        else
        {
            const _pathname = this.url.pathname;
            const _storage  = this.storage;
            const _filename = _storage.buildFilename(_pathname);
            if (this.isFile(_filename))
            {
                if (_storage.delete(_pathname))
                {
                    this.response.setProperties(
                        {
                            statusCode : 204
                        }
                    );
                    const _directory = _filename.replace(new RegExp(path.extname(_filename) + '$'), '');
                    console.log(_directory);
                    if (this.isDirectory(_directory))
                    {
                        console.log(JSON.stringify(this.rmdir(_directory)));
                    }
                }
                else
                {
                    // Ocurrió un error durante la eliminación.
                    _error = 500;
                }
            }
            else
            {
                _error = 404;
            }
        }
        if (_error)
        {
            this.response.setError(
                {
                    statusCode : _error
                }
            );
        }
        return super.process();
    }
}

//------------------------------------------------------------------------------
jfServerRestHandlerDelete.register();
module.exports = jfServerRestHandlerDelete;
