// Ejecutar este archivo dentro de mocha.
const jffs = require('jf-file-system').i();
const path = require('path');
const root = path.join(__dirname, '..', 'www', 'api');

function clearRoot()
{
    if (jffs.exists(root))
    {
        jffs.rmdir(root);
    }
}

const Runner = require('json-tests/src/runner');
const runner = new Runner(
    [
        path.join(__dirname, 'functional')
    ]
);
clearRoot();
require('json-tests/src/type/request').tearDown = clearRoot;
runner.run();
