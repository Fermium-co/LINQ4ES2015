"use strict";

import isGeneratorFunction from "./isGeneratorFunction";

export default function* (source, predicate) {

    if (source == null || source == undefined)
        throw new Error("source is null or undefined");
        
    if(!isGeneratorFunction(source))
        throw new Error('source must be an enumerable');
    
    let next = source.next();

    while (!next.done) {
        if (predicate(next.value))
            yield next.value;
        next = source.next();
    }
};