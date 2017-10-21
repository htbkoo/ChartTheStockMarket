let pem = require("pem-promise");

module.exports = {
    promiseCreate(options) {
        return pem.createCertificate(options);
    }
};
