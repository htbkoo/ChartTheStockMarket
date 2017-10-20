import fs from "fs";
import yaml from "js-yaml";

export default {
    safeLoadOrElse(params) {
        let swaggerObject = {};
        try {
            swaggerObject = yaml.safeLoad(fs.readFileSync(params.path, params.options));
        } catch (err) {
            console.log(err);
        }
        return swaggerObject;
    }
}
