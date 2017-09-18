import keycode from 'keycode';

const constants = ["ENTER", "SPACE"].reduce((prev, curr) => {
    prev[curr] = keycode(curr);
    return prev;
}, {});

const checks = {
    isEnter(primitive) {
        let isEnterEvent = keycode(keycode(primitive)) === constants.ENTER,
            isEnterString = keycode(primitive) === constants.ENTER,
            isEnterKeycode = primitive === constants.ENTER;
        return isEnterEvent || isEnterString || isEnterKeycode;
    }
};

export default {
    constants,
    checks
}