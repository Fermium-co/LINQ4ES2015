"use strict";

import utils from "./utils";
import asEnumerable from "./asEnumerable";

export default function (source, item) {
  if (this !== undefined && this !== null && arguments.length < 2) {
    item = source;
    source = this;
  }
  if (source == null || source == undefined) {
    throw new Error("source is null or undefined");
  }
  if (Array.isArray(source)) {
    return source.indexOf(item) !== -1;
  }
  if (!utils.isGenerator(source)) {
    throw new Error("source must be an enumerable");
  }

  let next = source.next();

  while (!next.done) {
    if (item == next.value) {
      return true;
    }
    next = source.next();
  }
  return false;
}