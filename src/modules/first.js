"use strict";

import utils from "./utils";
import asEnumerable from "./asEnumerable";

export default function (source, predicate) {
  if (this !== undefined && this !== null && arguments.length < 2) {
    predicate = source;
    source = this;
  }
  
  if (source == null || source == undefined) {
    throw new Error("source is null or undefined");
  }
  
  if (Array.isArray(source)) {
    if (source.length !== 0 && !predicate) {
      return source[0];
    }
  }
  
  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
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