"use strict";

import utils from "./utils";
import asEnumerable from './asEnumerable';
import toArray from './toArray';

export default function* (first, second, comparer) {
  if (this !== undefined && this !== null && arguments.length < 3) {
    comparer = second;
    second = first;
    first = this;
  }
  if (first == null || first == undefined) {
    throw new Error("first is null or undefined");
  }
  if (second == null || second == undefined) {
    throw new Error("second is null or undefined");
  }

  if (!utils.isGenerator(first)) {
    first = asEnumerable(first);
  }
  if (!utils.isGenerator(second)) {
    second = asEnumerable(second);
  }

  if (!(comparer instanceof Function)) {
    comparer = (a, b) => a == b;
  }

  let result = toArray(second);
  let next = first.next();
  while (!next.done) {
    if (popDistinct(result, next.value, comparer)) {
      yield next.value;
    }
    next = first.next();
  }
};

function popDistinct(array, item, comparer) {
  for (let i = 0; i < array.length; i++) {
    let element = array[i];
    if (comparer(element, item)) {
      array.splice(i, 1);
      return true;
    }
  }
  return false;
}