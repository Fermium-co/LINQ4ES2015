"use strict";


import utils from "./utils";
import asEnumerable from "./asEnumberable";

export default function (source, predicate) {
    if (arguments.length < 2) {
        predicate = source;
        source = this;
    }
    if (source == null || source == undefined) {
        throw new Error("source is null or undefined");
    }
    if (predicate == undefined)
        return source[0] != undefined;

    let i = 0;
    while(true){
        if(predicate(source[i]))
            return true;
        i++;
    }

    return false;
}