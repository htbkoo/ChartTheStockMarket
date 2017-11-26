const appModulePath = require('app-module-path');

const path = require('path');

const RESOLVE_PATHS = {
    src: `${path.normalize(__dirname + "/../src")}`
};

Object.keys(RESOLVE_PATHS).forEach(
    pathname => appModulePath.addPath(pathname)
);
