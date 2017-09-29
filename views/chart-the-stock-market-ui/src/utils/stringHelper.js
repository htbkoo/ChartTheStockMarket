const stringHelper = {
    convert: {
        forReduxActions: from => from.replace(/on(.)/, (match, p1) => p1.toLowerCase())
    }
};

export default stringHelper;