import chai from 'chai';
import keycode from 'keycode';

import keycodeHelper from '../utils/keycodeHelper';

describe("keycodeHelper", function () {
    describe("constants", function () {
        it("should expose ENTER as constant", function () {
            //    given
            const expected = keycode("ENTER");

            //    when
            let actual = keycodeHelper.ENTER;

            //    then
            chai.expect(actual).to.equal(expected);
        });
    });

    describe("isEnter", function () {
        it("should return true for isEnter('Enter')", function () {
            //    given
            const strKeycode = "Enter";

            //    when
            let expected = keycodeHelper.isEnter(strKeycode);

            //    then
            chai.expect(expected).to.be.true;
        });

        it("should return false for isEnter('sthElse')", function () {
            //    given
            const strKeycode = "sthElse";

            //    when
            let expected = keycodeHelper.isEnter(strKeycode);

            //    then
            chai.expect(expected).to.be.false;
        });

        it("should return true for isEnter(keycode('enter'))", function () {
            //    given
            const numKeycode = keycode("enter");

            //    when
            let expected = keycodeHelper.isEnter(numKeycode);

            //    then
            chai.expect(expected).to.be.true;
        });

        it("should return false for isEnter(keycode('space'))", function () {
            //    given
            const numKeycode = keycode("space");

            //    when
            let expected = keycodeHelper.isEnter(numKeycode);

            //    then
            chai.expect(expected).to.be.false;
        });
    });
});