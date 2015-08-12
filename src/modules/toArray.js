"use strict";

import utils from "./utils";

export default function (source) {
    source = source || this;
    if (source == null || source == undefined) {
        throw new Error("source is null or undefined");
    }
    if (Array.isArray(source)) {
        return source;
    }
        if (!utils.isGenerator(source)) {
        throw new Error("source must be an enumerable");
    }

    let result = [];
    let next = source.next();
    while (!next.done) {
        result.push(next.value);
        next = source.next();
    }
    return result;
};