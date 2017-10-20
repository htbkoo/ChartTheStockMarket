import fs from "fs";
import yaml from "js-yaml";

export default {
    safeLoadOrElse(params, defaultValue = {}) {
        let swaggerObject = defaultValue;
        try {
            swaggerObject = yaml.safeLoad(fs.readFileSync(params.path, params.options));
        } catch (err) {
            console.log(err);
        }
        return swaggerObject;
    }
}
