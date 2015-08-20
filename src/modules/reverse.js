"use  strict";

import utils from "./utils";
import asEnumerable from "./asEnumerable";

export default function* (source) {
  if (this !== undefined && this !== null && arguments.length == 0) {
    source = this;
  }
  if (source == null || source == undefined) {
    throw new Error("source is null or undefined");
  }
  if (Array.isArray(source)) {
    source = asEnumerable(source);
  }
  if (!utils.isGenerator(source)) {
    throw new Error("source must be an enumerable");
  }

  let next = source.next();
  let resultArray = [];

  while (!next.done) {
    resultArray.unshift(next.value);
    next = source.next();
  }

  for (let i = 0; i < resultArray.length; i++) {
    yield resultArray[i];
  }

}