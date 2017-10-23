import chai from "chai";

import swaggerHostResolver from "../../../services/swaggerHostResolver";

const originalProcessEnv = process.env;

describe('services', function () {
    describe("swaggerHostResolver", function () {
        beforeEach(function () {
            if (originalProcessEnv) {
                process.env = {...originalProcessEnv};
            } else {
                process.env = originalProcessEnv;
            }
        });

        describe('resolve', function () {
            it('should resolve() to get "localhost:3000" given process.env.SWAGGER_HOST=localhost, process.env.SWAGGER_REQUIRES_PORT=true and process.env.PORT=3000', function () {
                // given
                process.env.SWAGGER_HOST = "localhost";
                process.env.SWAGGER_REQUIRES_PORT = true;
                process.env.PORT = 3000;

                // when
                let host = swaggerHostResolver.resolve();

                // then
                chai.expect(host).to.deep.equal("localhost:3000");
            });
        });
    });
});
