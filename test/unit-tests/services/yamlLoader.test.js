import chai from "chai";
import path from "path";

import yamlLoader from "../../../services/yamlLoader";

describe('services', function () {
    describe("yamlLoader", function () {
        describe('safeLoadOrElse', function () {
            it('should safeLoad sample.yaml and create the yaml object successfully', function () {
                // given
                let expectedObject = {
                    key: {
                        subKey1: "someValue",
                        subKey2: "some other Value"
                    },
                    anotherKey: 3000
                };
                let path = getRelativePath("sample.yaml"), options = "utf-8";

                // when
                let swaggerObject = yamlLoader.safeLoadOrElse({path, options});

                // then
                chai.expect(swaggerObject).to.deep.equal(expectedObject);
            });

            it('should return the defaultValue when safeLoad non-existent file', function () {
                // given
                let defaultValue = {"key": "value"};
                let path = "someNonExistentFile.abc";

                // when
                let swaggerObject = yamlLoader.safeLoadOrElse({path}, defaultValue);

                // then
                chai.expect(swaggerObject).to.deep.equal(defaultValue);
            });
        });
    });

    function getRelativePath(part) {
        return path.normalize(`${__dirname}/${part}`);
    }
});
