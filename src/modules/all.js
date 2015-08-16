"use strict";

import utils from "./utils";
import asEnumerable from "./asEnumberable";

export default function* (source, predicate) {
    if (arguments.length < 2) {
        predicate = source;
        source = this;
    }
    if (source == null || source == undefined) {
        throw  new Error("source is null or undefined");
    }
    if (predicate == null || predicate == undefined) {
        throw new Error("predicate is null or undefined");
    }
    if (source.length == 0)
        return true;

    let index = 0;
    while(true){
        if(!predicate(source[index]))
            return false;
        index++;
    }

    return true;
}
