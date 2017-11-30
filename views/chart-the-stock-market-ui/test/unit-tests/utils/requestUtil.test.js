import sinon from "../../test-util/sinonWithSinonTest";
import mockery from "mockery";
import chai from "chai";
import sinonChai from "sinon-chai";

chai.use(sinonChai);

describe("requestUtil", function () {
    let mockRequest;

    beforeEach(function (done) {
        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false,
            useCleanCache: true
        });

        mockRequest = sinon.spy();
        mockery.registerMock('request-promise-native', mockRequest);

        done();
    });

    afterEach(function (done) {
        mockery.disable();
        mockery.deregisterAll();
        done();
    });

    it("should act as an adpater to the request library and expose for easier mocking", sinon.test(function () {
        // given
        const requestUtil = require("utils/requestUtil");
        const aUrl = "url", someOptions = {};

        // when
        requestUtil.request(aUrl, someOptions);

        // then
        chai.expect(mockRequest).to.have.been.calledWith(aUrl, someOptions);
    }));
});