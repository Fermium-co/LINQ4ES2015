"use strict";

export default function* (source) {

    if (source == null || source == undefined)
        throw new Error("source is null or undefined");

    if (Array.isArray(source)) {
        for (var index = 0;
            index < source.length; index++) {
            let element = source[index];
            yield element;
        }
    }
    else {

        return source;
    }

};