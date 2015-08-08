"use strict";

import isGeneratorFunction from "./isGeneratorFunction";

export default function* (source, totalCount) {

    if (source == null || source == undefined)
        throw new Error("source is null or undefined");
        
    if(!isGeneratorFunction(source))
        throw new Error('source must be an enumerable');
    
    let next = source.next();

    let count = 0;

    while (count < totalCount) {
        yield next.value;
        count++;
    }
};