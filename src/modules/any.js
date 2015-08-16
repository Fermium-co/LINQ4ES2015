"use strict";


import utils from "./utils";

export default function (source, predicate){
    if (arguments.length < 2) {
        predicate = source;
        source = this;
    }
    if (source == null || source == undefined) {
        throw new Error("source is null or undefined");
    }
    if (predicate == undefined)
        return source[0] != undefined;

    let next = source.next();
    while(!next.done){
        if(predicate(next.value))
            return true;
        next = source.next();
    }

    return false;
}