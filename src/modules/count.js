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
    if (!predicate) return source.length;
    source = source.asEnumerable();
  }
  if (!utils.isGenerator(source)) {
    throw new Error("source must be an enumerable");
  }

  if (!(predicate instanceof Function)) {
    predicate = undefined;
  }

  let count = 0
  let next = source.next();
  while (!next.done) {
    if (predicate) {
      if (predicate(next.value)) {
        count++;
      }
    } else {
      count++;
    }
    next = source.next();
  }
  return count;
};