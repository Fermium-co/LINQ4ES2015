"use strict";

import utils from "./utils";
import asEnumerable from "./asEnumerable";

export default function (source, seed, aggregation) {
  if (this !== undefined && this !== null && arguments.length < 3) {
    aggregation = seed;
    seed = source;
    source = this;
  }
  if (source == null || source == undefined) {
    throw new Error("source is null or undefined");
  }
  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
  }

  let next = source.next();
  let result = seed;
  while (!next.done) {
    result = aggregation(result, next.value);
    next = source.next();
  }
  return result;
};