"use strict";

import isGeneratorFunction from './isGeneratorFunction';

export default function (source) {

    if (source == null || source == undefined)
        throw new Error("source is null or undefined");
    
    if (isGeneratorFunction(source)) {
        let result = [];
        let next = source.next();

        while (!next.done) {
            result.push(next.value);
            next = source.next();
        }
        return result;
    }
    else{
        throw new Error("source is not enumerable");
    }
};