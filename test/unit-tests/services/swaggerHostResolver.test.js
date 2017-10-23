import chai from "chai";

import swaggerHostResolver from "../../../services/swaggerHostResolver";

const originalProcessEnv = process.env;

describe('services', function () {
    function cloneOf(obj) {
        return {...obj};
    }

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
            )
        });
    });
});
