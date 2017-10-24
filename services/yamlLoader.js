let fs = require("fs");
let yaml = require("js-yaml");
let log = require("loglevel");

module.exports = {
    safeLoadOrElse(params, defaultValue = {}) {
        let swaggerObject = defaultValue;
        try {
            swaggerObject = yaml.safeLoad(fs.readFileSync(params.path, params.options));
        } catch (err) {
            log.warn(err);
        }
        return swaggerObject;
    }
};
