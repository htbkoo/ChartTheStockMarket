import chai from 'chai';
import $ from 'jquery';

import keycodeHelper from '../utils/keycodeHelper';

require('./setup.jsx');

describe("mount test - keycodeHelper", function () {
    describe("for Event Case (with rewire)", function () {
        it("should return true for isEnter(mockEnterEvent)", function () {
            //    given
            // Unable to create an Event as specified by keycode (https://www.npmjs.com/package/keycode#keycodekeycodeevent)
            // Thus mocking with rewire in this way
            let enterEvent = $(global.window).Event("keyup");
            enterEvent.which = 13;
            enterEvent.keyCode = 13;

            //    when
            let actual = keycodeHelper.checks.isEnter(enterEvent);

            //    then
            chai.expect(actual).to.equal(true);
        });
    });
});