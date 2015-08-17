"use strict";

import utils from "./utils";

export default function* (source, orderByFunction) {
  if (this !== undefined && this !== null && arguments.length < 2) {
    orderByFunction = source;
    source = this;
  }

  let sortedResults = null;

  if (source == null || source == undefined) {
    throw new Error("source is null or undefined");
  }
  if (!(orderByFunction instanceof Function)) {
    throw new Error("order by column must be a function");
  }

  if (!Array.isArray(source) && !utils.isGenerator(source)) {
    throw new Error("source must be an enumerable");
  }

  sortedResults = source.toArray().sort((a, b) => orderByFunction(a) > orderByFunction(b));

  for (let index = 0; index < sortedResults.length; index++) {
    let element = sortedResults[index];
    yield element;
  }
};