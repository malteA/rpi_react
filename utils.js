const isEmpty = (obj) => {
    if (obj && Object.getOwnPropertyNames(obj).length === 0) {
        return true;
    }
    return false;
}

module.exports = isEmpty;