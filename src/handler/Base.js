const jfServerHandlerBase = require('jf-server/src/handler/Base');
/**
 * Clase base para los manejadores del proyecto.
 *
 * @namespace jf.server.rest.handler
 * @class     jf.server.rest.handler.Base
 * @extends   jf.server.handler.Base
 */
module.exports = class jfServerRestHandlerBase extends jfServerHandlerBase
{
    /**
     * Métodos aceptables para el CORS.
     *
     * @property corsMethods
     * @type     {string[]}
     */
    static get corsMethods()
    {
        return [
            'DELETE',
            'GET',
            'PATCH',
            'POST',
            'PUT'
        ];
    }

    /**
     * @override
     */
    static get extensions()
    {
        return ['*'];
    }

    /**
     * Desactiva el CORS en la petición.
     */
    cors()
    {
        const _requestHeaders  = this.request.headers;
        const _responseHeaders = this.response.headers;
        _responseHeaders.set(
            {
                'Access-Control-Allow-Credential' : 'true',
                'Access-Control-Allow-Methods'    : this.constructor.corsMethods.join(','),
                'Access-Control-Allow-Origin'     : _requestHeaders.origin || _requestHeaders.host,
                'Access-Control-Max-Age'          : 86400
            }
        );
        const _headers = _requestHeaders['access-control-request-headers'];
        if (_headers)
        {
            _responseHeaders.set('Access-Control-Allow-Headers', _headers);
        }
    }

    /**
     * @override
     */
    async process()
    {
        this.cors();

        return super.process();
    }
};
