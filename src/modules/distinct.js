"use strict";

import utils from "./utils";

export default function* (source, comparer) {
  if (this !== undefined && this !== null && arguments.length < 2) {
    //if (!utils.isGenerator(this) && (source instanceof Function)) {
      comparer = source;
      source = this;
    //}
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
    if (utils.safePush(result, next.value, comparer)) {
      yield next.value;
    }
    next = source.next();
  }
};