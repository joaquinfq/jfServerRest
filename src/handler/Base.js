const jfServerAdapterJson  = require('jf-server/src/adapter/Json');
const jfServerHandlerBase  = require('jf-server/src/handler/Base');
const jfServerResponseJson = require('jf-server/src/response/Json');
const jfServerStorageJson  = require('jf-server/src/storage/Json');
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
     * @override
     */
    static get extensions()
    {
        return ['*'];
    }

    /**
     * @override
     */
    _init(config)
    {
        this.adapter  = new jfServerAdapterJson(config);
        this.storage  = new jfServerStorageJson(config);
        this.response = new jfServerResponseJson(config);
    }
};
