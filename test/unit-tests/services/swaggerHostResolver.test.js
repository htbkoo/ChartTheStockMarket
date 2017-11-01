import chai from "chai";

import swaggerHostResolver from "../../../services/swaggerHostResolver";

const originalProcessEnv = process.env;

describe('services', function () {
    describe("swaggerHostResolver", function () {
        beforeEach(function () {
            if (originalProcessEnv) {
                process.env = cloneOf(originalProcessEnv);
            } else {
                process.env = originalProcessEnv;
            }
        });

        describe('resolve', function () {
            [
                {
                    mockProcessEnv: {
                        SWAGGER_HOST: "localhost",
                        SWAGGER_REQUIRES_PORT: "true",
                        PORT: "3000"
                    },
                    expectedHost: "localhost:3000"
                },
                {
                    mockProcessEnv: {
                        SWAGGER_HOST: "localhost",
                        SWAGGER_REQUIRES_PORT: "false",
                        PORT: "3000"
                    },
                    expectedHost: "localhost"
                },
                {
                    mockProcessEnv: {
                        SWAGGER_HOST: "otherhost",
                        SWAGGER_REQUIRES_PORT: "true",
                        PORT: "3000"
                    },
                    expectedHost: "otherhost:3000"
                },
                {
                    mockProcessEnv: {
                        SWAGGER_HOST: "otherhost",
                        SWAGGER_REQUIRES_PORT: "false",
                        PORT: "3000"
                    },
                    expectedHost: "otherhost"
                },
                {
                    mockProcessEnv: {
                        SWAGGER_HOST: "localhost",
                        SWAGGER_REQUIRES_PORT: "true",
                        PORT: "5000"
                    },
                    expectedHost: "localhost:5000"
                },
                {
                    mockProcessEnv: {
                        SWAGGER_HOST: "localhost",
                        SWAGGER_REQUIRES_PORT: "false",
                        PORT: "5000"
                    },
                    expectedHost: "localhost"
                },
                {
                    mockProcessEnv: {
                        SWAGGER_HOST: "otherhost",
                        SWAGGER_REQUIRES_PORT: "true",
                        PORT: "5000"
                    },
                    expectedHost: "otherhost:5000"
                },
                {
                    mockProcessEnv: {
                        SWAGGER_HOST: "otherhost",
                        SWAGGER_REQUIRES_PORT: "false",
                        PORT: "5000"
                    },
                    expectedHost: "otherhost"
                },
            ].forEach(testCase =>
                it(`should resolve() to get "${testCase.expectedHost}" given process.env includes ${JSON.stringify(testCase.mockProcessEnv)}`, function () {
                    // given
                    chai.expect(process.env).to.deep.equal(originalProcessEnv);
                    Object.assign(process.env, testCase.mockProcessEnv);

                    // when
                    let host = swaggerHostResolver.resolve();

                    // then
                    chai.expect(host).to.deep.equal(testCase.expectedHost);
                })
            );

            it("should return default host (localhost) if process.env.SWAGGER_HOST is undefined", function () {
                // given
                chai.expect(process.env).to.deep.equal(originalProcessEnv);

                const defaultValue = "localhost:4000";
                process.env.PORT = 4000;
                process.env.SWAGGER_REQUIRES_PORT = "true";

                chai.expect(process.env).to.not.have.property('SWAGGER_HOST');

                // when
                let host = swaggerHostResolver.resolve();

                // then
                chai.expect(host).to.deep.equal(defaultValue);
            });

            it("should be able to return host without port if process.env.SWAGGER_REQUIRES_PORT is undefined", function () {
                // given
                chai.expect(process.env).to.deep.equal(originalProcessEnv);

                const givenHost = "someHost";
                process.env.SWAGGER_HOST = givenHost;
                process.env.PORT = 4000;

                chai.expect(process.env).to.not.have.property('SWAGGER_REQUIRES_PORT');

                // when
                let host = swaggerHostResolver.resolve();

                // then
                chai.expect(host).to.deep.equal(givenHost);
            });

            it("should be able to return host without port if process.env.PORT is undefined", function () {
                // given
                chai.expect(process.env).to.deep.equal(originalProcessEnv);

                const givenHost = "someHost";
                process.env.SWAGGER_HOST = givenHost;
                process.env.SWAGGER_REQUIRES_PORT = "true";

                chai.expect(process.env).to.not.have.property('PORT');

                // when
                let host = swaggerHostResolver.resolve();

                // then
                chai.expect(host).to.deep.equal(givenHost);
            });
        });
    });

    function cloneOf(obj) {
        return {...obj};
    }
});
