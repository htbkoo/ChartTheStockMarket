import chai from 'chai';

import stringHelper from 'src/utils/stringHelper';

describe("stringHelper", function () {
    describe("mapping listener (onAction) to redux actions (action)", function () {
        [
            {from: "onRemoveStock", expectedTo: "removeStock"},
            {from: "onReorderStock", expectedTo: "reorderStock"},
        ].forEach(testCase =>
            it(`should convert from ${testCase.from} to ${testCase.expectedTo}`, function () {
                //    given

                //    when
                let actual = stringHelper.convert.forReduxActions(testCase.from);

                //    then
                chai.expect(actual).to.equal(testCase.expectedTo);
            })
        );
    });
});