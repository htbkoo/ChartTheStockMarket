function getDefinedOrElse(optional, defaultValue) {
    let isDefined = !(typeof optional === "undefined");
    return isDefined ? optional : defaultValue;
}

module.exports = {
    resolve() {
        const host = getDefinedOrElse(process.env.SWAGGER_HOST, "localhost"),
            optionalPort = isSwaggerPortRequired() ? `:${process.env.PORT}` : "";
        return `${host}${optionalPort}`;
    }
};

function isSwaggerPortRequired() {
    return process.env.SWAGGER_REQUIRES_PORT && process.env.PORT && "true" === process.env.SWAGGER_REQUIRES_PORT.toLocaleLowerCase();
}