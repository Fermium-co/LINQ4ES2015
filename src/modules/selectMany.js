"use strict";

import utils from "./utils";
import asEnumerable from "./asEnumerable"

export default function* (source, projection) {
  if (this !== undefined && this !== null && arguments.length < 2) {
    projection = source;
    source = this;
  }
  if (source == null || source == undefined) {
    throw new Error("source is null or undefined");
  }
  if (!(projection instanceof Function)) {
    throw new Error("projection format must be a function");
  }
  if (Array.isArray(source)) {
    source = source.asEnumerable();
  }
  if (!utils.isGenerator(source)) {
    throw new Error("source must be an enumerable");
  }

  let next = source.next();
  let index = 0;
  while (!next.done) {
    let innerEnumerable = projection(next.value, index);
    if (!utils.isGenerator(innerEnumerable))
      innerEnumerable = asEnumerable(innerEnumerable);
    let innerNext = innerEnumerable.next();
    while (!innerNext.done) {
      yield innerNext.value;
      innerNext = innerEnumerable.next();
    }
    next = source.next();
    index++;
  }
};