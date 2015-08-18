"use strict";

import utils from "./utils";

export default function* (source, comparer) {
  if (this !== undefined && this !== null && arguments.length < 2) {
    comparer = source;
    source = this;
  }
  if (source == null || source == undefined) {
    throw new Error("source is null or undefined");
  }
  if (Array.isArray(source)) {
    source = source.asEnumerable();
  }
  if (!utils.isGenerator(source)) {
    throw new Error("source must be an enumerable");
  }

  if (!(comparer instanceof Function)) {
    comparer = (a, b) => a == b;
  }

  let next = source.next();
  let result = [];
  while (!next.done) {
    if (pushDistinct(result, next.value, comparer)) {
      yield next.value;
    }
    next = source.next();
  }
};

function pushDistinct(array, item, comparer) {
  for (let i = 0; i < array.length; i++) {
    let element = array[i];
    if (comparer(element, item)) {
      return false
    }
  }
  array.push(item);
  return true;
}