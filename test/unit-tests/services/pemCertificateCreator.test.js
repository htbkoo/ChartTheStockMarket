import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import {sinonTest} from "../../test-utils/sinonWithSinonTest";
import pem from "pem-promise";

import pemCertificateCreator from "../../../services/pemCertificateCreator";

chai.use(chaiAsPromised);

describe('services', function () {
    describe("pemCertificateCreator", function () {
        describe('promiseCreate', function () {
            it('should get a promise with keys={serviceKey,certifcate} created by promiseCreate', sinonTest(function () {
                // given
                let mockCertificate = "someCert";
                this.stub(pem, "createCertificate").returns(Promise.resolve(mockCertificate));

                // when
                let promise = pemCertificateCreator.promiseCreate();

                // then
                return chai.expect(promise).to.eventually.deep.equal(mockCertificate);
            }));

            it('should propogate the error from pem.createCertificate() when promiseCreate()', sinonTest(function () {
                // given
                let expectedError = new Error("Could not find openssl on your system on this path: openssl");
                this.stub(pem, "createCertificate").returns(Promise.reject(expectedError));

                // when
                let promise = pemCertificateCreator.promiseCreate();

                // then
                return chai.expect(promise).to.eventually.be.rejectedWith(expectedError);
            }));
        });
    });
});
