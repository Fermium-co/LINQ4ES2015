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
    if (!predicate) {
      if (source.length === 0) {
        return null;
      }
      return source[source.length - 1];
    }
    source = source.asEnumerable();
  }
  if (!utils.isGenerator(source)) {
    throw new Error("source must be an enumerable");
  }

  if (!(predicate instanceof Function)) {
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