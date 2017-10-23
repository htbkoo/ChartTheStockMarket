module.exports = {
    resolve() {
        const host = process.env.SWAGGER_HOST,
            optionalPort = isSwaggerPortRequired() ? `:${process.env.PORT}` : "";
        return `${host}${optionalPort}`;
    }
};

function isSwaggerPortRequired() {
    return process.env.SWAGGER_REQUIRES_PORT && "true" === process.env.SWAGGER_REQUIRES_PORT.toLocaleLowerCase();
}