"use strict";

import utils from "./utils";
import asEnumerable from "./asEnumerable";

export default function* (source, projection) {
  if (this !== undefined && this !== null && arguments.length < 2) {
    projection = source;
    source = this;
  }
  if (source == null || source == undefined) {
    throw new Error("source is null or undefined");
  }
  if (!(projection instanceof Function)) {
    throw new Error("projection format must be a function");
  }
  if (Array.isArray(source)) {
    source = asEnumerable(source);
  }
  if (!utils.isGenerator(source)) {
    throw new Error("source must be an enumerable");
  }

  let next = source.next();
  let index = 0;
  while (!next.done) {
    yield projection(next.value, index);
    next = source.next();
    index++;
  }
};