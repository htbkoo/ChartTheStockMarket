let fs = require("fs");
let yaml = require("js-yaml");

module.exports = {
    safeLoadOrElse(params, defaultValue = {}) {
        let swaggerObject = defaultValue;
        try {
            swaggerObject = yaml.safeLoad(fs.readFileSync(params.path, params.options));
        } catch (err) {
            console.log(err);
        }
        return swaggerObject;
    }
};
