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
      if (source.length === 0) return null;
      if (source.length !== 1) throw new Error("Sequence contained multiple elements");
      return source[0];
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
  let result = next.value;
  if (!predicate) {
    if (next.done) {
      return null;
    }
    next = source.next();
    if (!next.done) {
      throw new Error("Sequence contained multiple elements");
    }
    return result;
  }

  let found = false;
  while (!next.done) {
    if (predicate(next.value)) {
      if (found) {
        throw new Error("Sequence contained multiple matching elements");
      }
      found = true;
      result = next.value;
    }
    next = source.next();
  }
  if (!found) {
    return null;
  }
  return result;
};