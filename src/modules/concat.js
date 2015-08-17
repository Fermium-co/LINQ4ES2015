"use strict";

import utils from "./utils";

export default function* (firstSource, secondSource) {
  if (arguments.length == 1) {
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

  if (!utils.isGenerator(firstSource))
    firstSource = firstSource.asEnumerable();
  if (!utils.isGenerator(secondSource))
    secondSource = secondSource.asEnumerable();

  let next = firstSource.next();
  while (!next.done) {
    yield next.value;
    next = firstSource.next();
  }

  next = secondSource.next();
  while (!next.done) {
    yield next.value;
    next = secondSource.next();
  }
};