"use strict";

import utils from "./utils";
import asEnumerable from "./asEnumerable";

export default function* (source, takeCount) {
  if (this !== undefined && this !== null && arguments.length < 2) {
    takeCount = source;
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
  if (isNaN(takeCount) || takeCount == null) {
    throw new Error("take number must be a number");
  }

  let next = source.next();
  let count = 0;
  while (true) {
    yield next.value;
    if (++count >= takeCount) {
      break;
    }
    next = source.next();
  }
};