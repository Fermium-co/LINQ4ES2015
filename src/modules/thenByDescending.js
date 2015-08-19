"use strict";

import utils from "./utils";
import toArray from "./toArray";

export default function* (source, thenByFunction) {
  if (this !== undefined && this !== null && arguments.length < 2) {
    thenByFunction = source;
    source = this;
  }
  if (source == null || source == undefined) {
    throw new Error("source is null or undefined");
  }
  if (!(thenByFunction instanceof Function)) {
    throw new Error("order by descending column must be a function");
  }
  if (!Array.isArray(source) && !utils.isGenerator(source)) {
    throw new Error("source must be an enumerable");
  }

  let next = source.next();
  while (!next.done) {
    yield next.value;
    next = source.next();
  }
};