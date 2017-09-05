import keycode from 'keycode';

const constants = ["ENTER", "SPACE"].reduce((prev, curr) => {
    prev[curr] = keycode(curr);
    return prev;
}, {});

export default {
    constants,
    isEnter(primitive) {
        return keycode(primitive) === constants.ENTER || primitive === constants.ENTER;
    }
}