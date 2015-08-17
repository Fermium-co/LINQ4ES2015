"use strict";

import utils from "./utils";

export default function (source, predicate) {
  if (arguments.length < 2) {
    predicate = source;
    source = this;
  }
  if (source == null || source == undefined) {
    throw new Error("source is null or undefined");
  }
  if (Array.isArray(source)) {
    if (!predicate) {
      if (source.length === 0) {
        throw new Error("Sequence is empty");
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
    throw new Error("Sequence is empty");
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
    throw new Error("No items matched the predicate");
  }
  return last;
};