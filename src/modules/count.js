"use strict";

import utils from "./utils";

export default function (source, predicate) {
    if (arguments.length < 2) {
        predicate = source;
        source = this;
    }
    if (source == null || source == undefined) {
        throw new Error("source is null or undefined");
    }
    if (Array.isArray(source)) {
        if (!predicate) return source.length;
        source = source.asEnumerable();
    }
    if (!utils.isGenerator(source)) {
        throw new Error("source must be an enumerable");
    }

    if (!(predicate instanceof Function)) {
        predicate = undefined;
    }

    let count = 0
    let next = source.next();
    while (!next.done) {
        if (predicate && predicate(next.value)) {
            count++;
        }
        next = source.next();
    }
    return count;
};