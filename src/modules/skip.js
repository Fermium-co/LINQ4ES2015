"use strict";

import utils from "./utils";
import asEnumerable from "./asEnumerable";

export default function* (source, skipCount) {
  if (this !== undefined && this !== null && arguments.length < 2) {
    skipCount = source;
    source = this;
  }
  if (source == null || source == undefined) {
    throw new Error("source is null or undefined");
  }
  if (Array.isArray(source)) {
    source = asEnumerable(source);
  }
  if (!utils.isGenerator(source)) {
    throw new Error("source must be an enumerable");
  }
  if (isNaN(skipCount) || skipCount == null) {
    throw new Error("skip number must be a number");
  }

  let next = source.next();
  let count = 0;
  while (!next.done) {
    if (++count > skipCount) {
      yield next.value;
    }
    next = source.next();
  }
};