"use strict";

import utils from "./utils";

export default function* (source, projection) {
  if (arguments.length == 1) {
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
    source = source.asEnumerable();
  }
  if (!utils.isGenerator(source)) {
    throw new Error("source must be an enumerable");
  }

  let next = source.next();
  while (!next.done) {
    yield projection(next.value);
    next = source.next();
  }
};