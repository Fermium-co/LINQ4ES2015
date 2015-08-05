"use strict";

import asEnumerable from "./asEnumerable";

export default function* (source,predicate) {
	
    if (source == null || source == undefined)
        throw new Error("source is null or undefined");
    
    var sourceAsEnumerable = asEnumerable(source);
    
    let next = sourceAsEnumerable.next();

    while (!next.done) {
        if (predicate(next.value))
            yield next.value;
        next = sourceAsEnumerable.next();
    }
	
};