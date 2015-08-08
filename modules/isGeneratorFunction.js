"use strict";

import GeneratorFunctionPrototype from "./GeneratorFunctionPrototype";

export default function (source) {

    if (source == null || source == undefined)
        throw new Error("source is null or undefined");
    
    return source instanceof GeneratorFunctionPrototype;
};