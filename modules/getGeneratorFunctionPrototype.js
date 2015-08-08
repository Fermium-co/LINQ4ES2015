"use strict";

/*
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/GeneratorFunction
	Note that GeneratorFunction is not a global object. It could be obtained by evaluating the following code:
*/

export default {
    generatorFunctionPrototype : (function* () { }).constructor.prototype
};