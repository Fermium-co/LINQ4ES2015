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
    if (!predicate && source.length > 0) {
      return true;
    }
    source = asEnumerable(source);
  }
  if (!utils.isGenerator(source)) {
    throw new Error("source must be an enumerable");
  }

  if (!(predicate instanceof Function)) {
    predicate = undefined;
  }

  let next = source.next();
  if (!predicate) {
    return !next.done;
  }

  while (!next.done) {
    if (predicate(next.value)) {
      return true;
    }
    next = source.next();
  }
  return false;
}