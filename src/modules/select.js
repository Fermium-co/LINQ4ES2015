"use strict";

import utils from "./utils";
import asEnumerable from "./asEnumerable";

export default function* (source, selector) {
  if (this !== undefined && this !== null && arguments.length < 2) {
    selector = source;
    source = this;
  }
  
  if (source == null || source == undefined) {
    throw new Error("source is null or undefined");
  }
  if (!(selector instanceof Function)) {
    throw new Error("selector must be a function");
  }
  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
  }

  let index = 0;
  let next = source.next();
  while (!next.done) {
    yield selector(next.value, index);
    next = source.next();
    index++;
  }
};