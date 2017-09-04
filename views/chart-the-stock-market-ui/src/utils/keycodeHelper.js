import keycode from 'keycode';

const ENTER = keycode("ENTER");

export default {
    ENTER,
    isEnter(primitive) {
        return keycode(primitive)===ENTER;
    }
}