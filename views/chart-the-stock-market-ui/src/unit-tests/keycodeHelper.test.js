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
        [
            {
                name: "should return true for isEnter('Enter')",
                inputParam: "Enter",
                expected: true
            },
            {
                name: "should return false for isEnter('sthElse')",
                inputParam: "sthElse",
                expected: false
            },
            {
                name: "should return true for isEnter(keycode('enter'))",
                inputParam: keycode("enter"),
                expected: true
            },
            {
                name: "should return false for isEnter(keycode('space'))",
                inputParam: keycode("space"),
                expected: false
            }
        ].forEach(testcase =>
            it(testcase.name, function () {
                //    given
                //    when
                let expected = keycodeHelper.isEnter(testcase.inputParam);

                //    then
                chai.expect(expected).to.equal(testcase.expected);
            })
        );
    });
});