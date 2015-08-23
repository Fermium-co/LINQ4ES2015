"use strict";

export default {
	/*https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/GeneratorFunction
	Note that GeneratorFunction is not a global object. It could be obtained by evaluating the following code:*/
  GeneratorFunctionPrototype: (function* () { }).constructor.prototype,
  GeneratorFunctionProto: (function* () { }).prototype.__proto__,

  isGenerator: function (source) {
    if (source == null || source == undefined) {
      return false;
    }

    return source instanceof this.GeneratorFunctionPrototype;
  },

  safePush: function (array, item, comparer) {
    for (let i = 0; i < array.length; i++) {
      let element = array[i];
      if (comparer(element, item)) {
        return false;
      }
    }
    array.push(item);
    return true;
  }
};