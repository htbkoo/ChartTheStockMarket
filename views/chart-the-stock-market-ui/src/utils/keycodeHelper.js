import keycode from 'keycode';

const KEYCODE_ENTER = keycode("ENTER");
const KEYCODE_SPACE = keycode("SPACE");

export default {
    ENTER: KEYCODE_ENTER,
    SPACE: KEYCODE_SPACE,
    isEnter(primitive) {
        return keycode(primitive) === KEYCODE_ENTER || primitive === KEYCODE_ENTER;
    }
}