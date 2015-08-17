"use strict";

import utils from "./utils";

export default function* (source, predicate) {
  if (this !== undefined && this !== null && arguments.length < 2) {
    predicate = source;
    source = this;
  }
  if (source == null || source == undefined) {
    throw new Error("source is null or undefined");
  }
  if (!(predicate instanceof Function)) {
    throw new Error("predicate must be a function");
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
    if (predicate(next.value, index))
      yield next.value;
    next = source.next();
    index++;
  }
};