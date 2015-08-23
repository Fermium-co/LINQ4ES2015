"use strict";

import utils from "./utils";
import toArray from "./toArray";

export default function* (source, orderByDescendingFunction) {
  if (this !== undefined && this !== null && arguments.length < 2) {
    orderByDescendingFunction = source;
    source = this;
  }

  let sortedResults = null;

  if (source == null || source == undefined) {
    throw new Error("source is null or undefined");
  }
  if (!(orderByDescendingFunction instanceof Function)) {
    throw new Error("order by descending column must be a function");
  }

  if (!Array.isArray(source) && !utils.isGenerator(source)) {
    throw new Error("source must be an enumerable");
  }

  sortedResults = toArray(source).sort((a, b) => orderByDescendingFunction(a) < orderByDescendingFunction(b));

  for (let index = 0; index < sortedResults.length; index++) {
    let element = sortedResults[index];
    yield element;
  }
};