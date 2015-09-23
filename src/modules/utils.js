'use strict';

let utils = {
	/*https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/GeneratorFunction
	Note that GeneratorFunction is not a global object. It could be obtained by evaluating the following code:*/
  GeneratorFunctionPrototype: (function* () { }).constructor.prototype,
  GeneratorFunctionProto: (function* () { }).prototype.__proto__,

  isGenerator: (source) => {
    if (source == null || source == undefined) {
      return false;
    }
    return source instanceof utils.GeneratorFunctionPrototype;
  },

  safePush: (array, item, comparer) => {
    for (let i = 0; i < array.length; i++) {
      let element = array[i];
      if (comparer(element, item)) {
        return false;
      }
    }
    array.push(item);
    return true;
  },

  canBeEnumerated: (source) => {
    return source !== null && (Array.isArray(source) || typeof source === 'string' || source instanceof String || typeof source === 'object');
  },

  isFunc: (input) => input instanceof Function,

  defaultComparer: {
    compare: (a, b) => {
      if (a > b) return 1;
      if (a == b) return 0;
      return -1;
    }
  },

  defineProperty: (object, name, value, force) => {
   const supportsDescriptors = true; // targeting ES6...
   if (!force && name in object) { return; }
   if (supportsDescriptors) {
     Object.defineProperty(object, name, {
       configurable: true,
       enumerable: false,
       writable: true,
       value: value
     });
   } else {
     object[name] = value;
   }
 },

 // Define configurable, writable and non-enumerable props
 // if they don’t exist.
 defineProperties: (object, map) => {
   Object.keys(map).forEach(name => {
     var method = map[name];
     utils.defineProperty(object, name, method, false);
   });
 }
};

export default utils;
