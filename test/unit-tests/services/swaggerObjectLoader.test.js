import chai from "chai";
import path from "path";

import swaggerObjectLoader from "../../../services/swaggerObjectLoader";

describe('services', function () {
    describe("swaggerObjectLoader", function () {
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
                let swaggerObject = swaggerObjectLoader.safeLoadOrElse({path, options});

                // then
                chai.expect(swaggerObject).to.deep.equal(expectedObject);
            });
        });
    });

    function getRelativePath(part) {
        return path.normalize(`${__dirname}/${part}`);
    }
});
