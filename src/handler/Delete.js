const jfServerRestHandlerBase = require('./Base');
/**
 * Punto de entrada de las peticiones DELETE.
 *
 * @namespace jf.server.rest.handler
 * @class     jf.server.rest.handler.Delete
 * @extends   jf.server.rest.handler.Base
 */
module.exports = class jfServerRestHandlerDelete extends jfServerRestHandlerBase
{
    /**
     * @override
     */
    async process()
    {
        let _error;
        switch(this.storage.delete(this.url.pathname))
        {
            case 0:
                _error = 404;
                break;
            case false:
                _error = 500;
                break;
            default:
                this.response.setProperties(
                    {
                        statusCode : 204
                    }
                );
                break;
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
