"use strict";

import utils from "./utils";

export default function* (source, projection) {
    if (arguments.length == 1) {
        projection = source;
        source = this;
    }
    if (source == null || source == undefined) {
        throw new Error("source is null or undefined");
    }
    if (!utils.isGenerator(source)) {
        source = source.asEnumerable();
    }

    let next = source.next();
    while (!next.done) {
        yield projection(next.value);
        next = source.next();
    }
};