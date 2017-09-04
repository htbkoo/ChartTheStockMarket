import chai from 'chai';
import keycode from 'keycode';

import keycodeHelper from '../utils/keycodeHelper';

describe("keycodeHelper", function () {
    it("should expose ENTER as constant", function () {
        //    given
        //    when
        //    then
        chai.expect(keycodeHelper.ENTER).to.equal(keycode("ENTER"));
    });
});