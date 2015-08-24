"use strict";

import utils from "./utils";
import asEnumerable from "./asEnumerable";

export default function (source, selector) {
  if (this !== undefined && this !== null && arguments.length < 2) {
    selector = source;
    source = this;
  }

  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
  }

  if (!(selector instanceof Function)) {
    selector = a => a;
  }

  let sum = 0;
  let next = source.next();
  while (!next.done) {
    sum += selector(next.value);
    next = source.next();
  }
  return sum;
};