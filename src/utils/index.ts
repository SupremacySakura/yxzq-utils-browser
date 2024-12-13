const checkIfInstanceOf = function (obj: any, classFunction: any) {
    if (obj === null || obj === undefined || !(classFunction instanceof Function))
        return false;
    return Object(obj) instanceof classFunction;
}

export {
    checkIfInstanceOf,
}