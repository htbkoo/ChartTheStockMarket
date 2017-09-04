import keycode from 'keycode';

const KEYCODE_ENTER = keycode("ENTER");

export default {
    ENTER: KEYCODE_ENTER,
    isEnter(primitive) {
        return keycode(primitive) === KEYCODE_ENTER || primitive === KEYCODE_ENTER;
    }
}