"use strict";

import utils from "./utils";
import asEnumerable from "./asEnumerable";

export default function (source, predicate) {
  if (this !== undefined && this !== null && arguments.length < 2 && (!source || utils.isFunc(source))) {
    predicate = source;
    source = this;
  }
  
  if (Array.isArray(source)) {
    if (!predicate) {
      if (source.length === 0) {
        return null;
      }
      return source[source.length - 1];
    }
  }
  
  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
  }

  if (!utils.isFunc(predicate)) {
    predicate = undefined;
  }

  let next = source.next();
  if (next.done) {
    return null;
  }

  let last = null;
  if (!predicate) {
    while (!next.done) {
      last = next.value;
      next = source.next();
    }
    return last;
  }

  let found = false;
  while (!next.done) {
    if (predicate(next.value)) {
      found = true;
      last = next.value;
    }
    next = source.next();
  }
  if (!found) {
    return null;
  }
  return last;
};