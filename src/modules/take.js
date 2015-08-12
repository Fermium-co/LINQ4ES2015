"use strict";

import utils from "./utils";

export default function* (source, totalCount) {
    
    if (arguments.length == 1) {
        totalCount = source;
        source = this;
    }
    if (source == null || source == undefined) {
        throw new Error("source is null or undefined");
    }
    if (Array.isArray(source)) {
        source = source.asEnumerable();
    }    
    if (!utils.isGenerator(source)) {
        throw new Error("source must be an enumerable");
    }
    if (isNaN(totalCount) || totalCount == null) {
        throw new Error("take number must be a number");
    }

    let next = source.next();
    let count = 0;
    while (true) {
        yield next.value;
        if (++count >= totalCount)
            break;
        next = source.next();
    }
};