const request = require("request-promise-native");

module.exports = {
    request(...params) {
        return request(...params);
    }
};