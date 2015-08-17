"use strict";

import utils from "./utils";
import asEnumerable from "./asEnumerable";

export default function (firstSource, secondSource, customComparer) {
  if (this !== undefined && this !== null && arguments.length < 3) {
    customComparer = secondSource;
    secondSource = firstSource;
    firstSource = this;
  }
  if (firstSource == null || firstSource == undefined) {
    throw new Error("first source is null or undefined");
  }
  if (secondSource == null || secondSource == undefined) {
    throw new Error("second source is null or undefined");
  }
  if (!utils.isGenerator(firstSource) && !Array.isArray(firstSource)) {
    throw new Error("first source must be either an enumerable or an array");
  }
  if (!utils.isGenerator(secondSource) && !Array.isArray(secondSource)) {
    throw new Error("second source must be either an enumerable or an array");
  }
  if (Array.isArray(firstSource) && Array.isArray(secondSource)) {
    if (firstSource.length != secondSource.length)
      return false;
  }

  if (!utils.isGenerator(firstSource)) {
    firstSource = asEnumerable(firstSource);
  }
  if (!utils.isGenerator(secondSource)) {
    secondSource = asEnumerable(secondSource);
  }

  let next = firstSource.next();
  let next2 = secondSource.next();
  let useCustomComparer = typeof customComparer == "function";

  while (!next.done && !next2.done) {
    if (useCustomComparer) {
      if (!customComparer(next.value, next2.value)) {
        return false;
      }
    }
    else if (next.value != next2.value) {
      return false;
    }
    next = firstSource.next();
    next2 = secondSource.next();
  }
  if (next.done != next2.done) {
    return false;
  }

  return true;
};