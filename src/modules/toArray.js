"use strict";

import utils from "./utils";

export default function (source) {
    source = source || this;
    if (source == null || source == undefined) {
        throw new Error("source is null or undefined");
    }
    if (!utils.isGenerator(source)) {
        source = source.asEnumerable();
    }

    let result = [];
    let next = source.next();
    while (!next.done) {
        result.push(next.value);
        next = source.next();
    }
    return result;
};