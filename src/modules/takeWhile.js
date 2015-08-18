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
    throw new Error("source is null or undefined");
  }
  if (Array.isArray(source)) {
    source = asEnumerable(source);

    if (!util.isGenerator(source))
      throw new Error("source must be an enumerable");

    let next = source.next();

    while (next.done) {
      if (predicate(next.value)) {
        yield next.value;
        break;
      }
      yield next.value;
      next = source.next();
    }
  }
}