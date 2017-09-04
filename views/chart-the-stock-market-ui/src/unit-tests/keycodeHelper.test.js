import chai from 'chai';
import keycode from 'keycode';

import keycodeHelper from '../utils/keycodeHelper';

describe("keycodeHelper", function () {
    it("should expose ENTER as constant", function () {
        //    given
        const expected = keycode("ENTER");

        //    when
        let actual = keycodeHelper.ENTER;

        //    then
        chai.expect(actual).to.equal(expected);
    });

    it("should return true for isEnter('Enter')", function () {
        //    given
        const strKeycode = "Enter";

        //    when
        let expected = keycodeHelper.isEnter('Enter');

        //    then
        chai.expect(expected).to.be.true;
    });
});