const jfServerRestHandlerBase = require('./Base');

/**
 * Punto de entrada de las peticiones PATCH.
 *
 * @namespace jf.server.rest.handler
 * @class     jf.server.rest.handler.Patch
 * @extends   jf.server.rest.handler.Base
 */
class jfServerRestHandlerPatch extends jfServerRestHandlerBase
{
    /**
     * @override
     */
    async process()
    {
        let _error;
        const _body     = this.body;
        const _storage  = this.storage;
        const _pathname = this.url.pathname;
        const _data     = _storage.retrieve(_pathname);
        if (_data === false)
        {
            _error = this.isDirectory(this.getFilename())
                ? 405
                : 404;
        }
        else if (_body && typeof _body === 'object')
        {
            if (_data)
            {
                if (!this._update(_pathname, _data))
                {
                    _error = 500;
                }
            }
            else
            {
                _error = 500;
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

        return super.process();
    }

    /**
     * Actualiza el contenido del registro.
     *
     * @param {string} pathname Ruta del recurso.
     * @param {object} data     Datos actuales.
     *
     * @return {boolean} Resultado de la operación.
     *
     * @protected
     */
    _update(pathname, data)
    {
        Object.assign(data, this.body);
        const _result = this.storage.update(pathname, data);
        if (_result)
        {
            this.response.setProperties(
                {
                    data,
                    statusCode : 200
                }
            );
        }

        return _result;
    }
}

//------------------------------------------------------------------------------
jfServerRestHandlerPatch.register();
module.exports = jfServerRestHandlerPatch;
