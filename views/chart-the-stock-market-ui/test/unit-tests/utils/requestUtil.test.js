import sinon from "../../test-util/sinonWithSinonTest";

import requestUtil from "utils/requestUtil";

describe("requestUtil", function(){
    afterEach(function () {
        requestUtil.__ResetDependency__('request');
    });

    xit("should act as an adpater to the fetch API and expose for easier mocking", function () {
    });

    it("should act as an adpater to the request library and expose for easier mocking", sinon.test(function () {
        // given
        const mockRequest = this.mock();
        let aUrl = "url", someOptions = {};
        mockRequest.withArgs(aUrl, someOptions).once();
        requestUtil.__Rewire__('request', mockRequest);

        // when
        requestUtil.request(aUrl, someOptions);

        // then
        mockRequest.verify();
    }));
});