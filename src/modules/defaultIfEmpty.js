"use strict";

import utils from "./utils";
import asEnumerable from "./asEnumerable"

export default function* (source, defaultValue) {
  if (this !== undefined && this !== null && arguments.length < 2) {
    defaultValue = source;
    source = this;
  }
  if (source == null || source == undefined) {
    throw new Error("source is null or undefined");
  }
  
  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
  }

  let next = source.next();
  if (next.done) {
    yield defaultValue;
  }
  while (!next.done) {
    yield next.value;
    next = source.next();
  }
}