"use strict";

export default function (source) {

    if (source == null || source == undefined)
        throw new Error("source is null or undefined");

    if (Array.isArray(source)) {
        return source;
    }
    else {
        let result = [];
        let next = source.next();

        while (!next.done) {
            result.push(next.value);
            next = source.next();
        }
        return result;
    }

};