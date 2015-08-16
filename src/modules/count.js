"use strict";

import utils from "./utils";

export default function (source) {
    source = source || this;
    if (source == null || source == undefined) {
        throw new Error("source is null or undefined");
    }
    if (Array.isArray(source)) {
        return source.length;
    }
    if (!utils.isGenerator(source)) {
        throw new Error("source must be an enumerable");
    }

    let count = 0
    let next = source.next();
    while (!next.done) {
        count++;
        next = source.next();
    }
    return count;
};