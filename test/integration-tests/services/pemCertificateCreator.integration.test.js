import chai from "chai";

import pemCertificateCreator from "../../../services/pemCertificateCreator";

describe('services', function () {
    describe("pemCertificateCreator", function () {
        describe('promiseCreate', function () {
            it('should get a promise with keys={serviceKey,certifcate} created by promiseCreate', function () {
                // given
                let expectedKeys = {
                    certificate: {
                        begin: "-----BEGIN CERTIFICATE-----",
                        end: "-----END CERTIFICATE-----"
                    },
                    clientKey: {
                        begin: "-----BEGIN RSA PRIVATE KEY-----",
                        end: "-----END RSA PRIVATE KEY-----"
                    },
                    csr: {
                        begin: "-----BEGIN CERTIFICATE REQUEST-----",
                        end: "-----END CERTIFICATE REQUEST-----"
                    },
                    serviceKey: {
                        begin: "-----BEGIN RSA PRIVATE KEY-----",
                        end: "-----END RSA PRIVATE KEY-----"
                    },
                };

                // when
                let promise = pemCertificateCreator.promiseCreate();

                // then
                return promise.then(keys => {
                    Object.keys(expectedKeys).forEach(name => {
                        chai.expect(keys[name]).to.have.string(expectedKeys[name].begin);
                        chai.expect(keys[name]).to.have.string(expectedKeys[name].end);
                    });
                });
            });
        });
    });
});
