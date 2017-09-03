import sinon from 'sinon';

export function matchAction(action) {
    // TODO: bug in at least sinon@3.2.1, unable to use sinon.match(obj) if not in jsdom environment
    // return sinon.match(addStock(underlyingId));
    return sinon.match(function (value) {
        return Object.keys(action).every(key => (key in value) && (action[key] === value[key]));
    })
}