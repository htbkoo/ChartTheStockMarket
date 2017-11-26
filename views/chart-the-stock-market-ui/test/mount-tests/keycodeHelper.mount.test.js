import chai from 'chai';
import $ from 'jquery';

import keycodeHelper from 'src/utils/keycodeHelper';

describe("mount test - keycodeHelper", function () {
    describe("for Event Case (with rewire)", function () {
        beforeEach(() => require('./setup.jsx'));

        it("should return true for isEnter(mockEnterEvent)", function () {
            //    given
            // Temporary fix for the 2 situations (jsdom environment vs node environment)
            let jquerySelector = 'Event' in $ ? $ : $(global.window);

            // Creating a keyup Event by jquery, as this is the actual use case in keycode (https://www.npmjs.com/package/keycode#keycodekeycodeevent)
            let enterEvent = jquerySelector.Event("keyup");
            enterEvent.which = 13;
            enterEvent.keyCode = 13;

            //    when
            let actual = keycodeHelper.checks.isEnter(enterEvent);

            //    then
            chai.expect(actual).to.equal(true);
        });
    });
});