import chai from "chai";
import path from "path";
import {sinon, sinonTest} from "../../test-utils/sinonWithSinonTest";
import loglevel from "loglevel";

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

            it('should return the defaultValue and log with loglevel.warn() when safeLoad non-existent file', sinonTest(function () {
                // given
                let defaultValue = {"key": "value"};
                let path = "someNonExistentFile.abc";
                let mockLogLevel = this.mock(loglevel);
                let isInstanceOfError = error=>{console.log(error);return true;};
                let matchExpectedError = sinon.match(isInstanceOfError).and(sinon.match.has('message', sinon.match(/ENOENT: no such file or directory, open/)));

                // Unfortunately sinon.match.instanceOf(Error) failed with Jest as the testing framework (but it passed with mocha) - possibly a bug?
                // let matchExpectedError = sinon.match.instanceOf(Error).and(sinon.match.has('message', sinon.match(/ENOENT: no such file or directory, open/)));

                mockLogLevel.expects("warn").withArgs(matchExpectedError).once();

                // when
                let swaggerObject = yamlLoader.safeLoadOrElse({path}, defaultValue);

                // then
                chai.expect(swaggerObject).to.deep.equal(defaultValue);
                mockLogLevel.verify();
            }));
        });
    });

    function getRelativePath(part) {
        return path.normalize(`${__dirname}/${part}`);
    }
});
