"use strict";

import utils from "./utils";

export default function* (source, predicate) {
    if (arguments.length == 1) {
        predicate = source;
        source = this;
    }
    if (source == null || source == undefined) {
        throw new Error("source is null or undefined");
    }
    if (!(predicate instanceof Function)) {
        throw new Error("predicate must be a function");
    }
    if (!utils.isGenerator(source)) {
        source = source.asEnumerable();
    }

    let next = source.next();
    while (!next.done) {
        if (predicate(next.value))
            yield next.value;
        next = source.next();
    }
};