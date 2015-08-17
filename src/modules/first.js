"use strict";

import utils from "./utils";

export default function (source, predicate) {
  if (this !== undefined && this !== null && arguments.length < 2) {
    predicate = source;
    source = this;
  }
  if (source == null || source == undefined) {
    throw new Error("source is null or undefined");
  }
  if (Array.isArray(source)) {
    //if (!predicate) return source[0];
    source = source.asEnumerable();
  }
  if (!utils.isGenerator(source)) {
    throw new Error("source must be an enumerable");
  }

  if (!(predicate instanceof Function)) {
    predicate = undefined;
  }

  let next = source.next();
  if (!predicate) {
    if (next.done) {
      throw new Error("Sequence is empty");
    }
    return next.value;
  }

  while (!next.done) {
    if (predicate(next.value)) {
      return next.value;
    }
    next = source.next();
  }
  throw new Error("Sequence contains no matching element");
};