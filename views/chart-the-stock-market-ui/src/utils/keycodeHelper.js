import keycode from 'keycode';

const constants = ["ENTER", "SPACE"].reduce((prev, curr) => {
    prev[curr] = keycode(curr);
    return prev;
}, {});

const checks = {
    isEnter(primitive) {
        return keycode(keycode(primitive)) === constants.ENTER || keycode(primitive) === constants.ENTER || primitive === constants.ENTER;
    }
};

export default {
    constants,
    checks
}