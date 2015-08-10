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
    if (!utils.isGenerator(source)) {
        source = source.asEnumerable();
    }

    let next = source.next();
    let count = 0;
    while (count < totalCount) {
        yield next.value;
        count++;
        next = source.next();
    }
};