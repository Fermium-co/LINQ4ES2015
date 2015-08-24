"use strict";

import util from "./utils";
import asEnumerable from "./asEnumerable";

export default function* (source, predicate) {
  if (this !== undefined && this !== null && arguments.length < 2) {
    predicate = source;
    source = this;
  }
  
  if (source == null || source == undefined) {
    throw new Error("source is null or undefined");
  }
  if (predicate == null || predicate == undefined) {
    throw new Error("predicate is null or undefined");
  }
  
  if (!util.isGenerator(source)) {
    source = asEnumerable(source);
  }
  if (!(predicate instanceof Function)) {
    throw new Error('predicate must be a function');
  }

  let index = 0;
  let next = source.next();
  while (!next.done) {
    if (!predicate(next.value, index)) {
      break;
    }
    index++;
    yield next.value;
    next = source.next();
  }
}