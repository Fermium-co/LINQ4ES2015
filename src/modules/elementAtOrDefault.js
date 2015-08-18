"use strict";

import utils from "./utils";
import asEnumerable from "./asEnumerable";

export default function (source, index) {
  if (this !== undefined && this !== null && arguments.length < 2) {
    index = source;
    source = this;
  }
  if (source == null || source == undefined) {
    throw new Error("source is null or undefined");
  }
  if (Array.isArray(source)) {
    if (source.length > index) {
      return source[index];
    }
    source = asEnumerable(source);
  }
  if (!utils.isGenerator(source)) {
    throw new Error("source must be an enumerable");
  }

  if (isNaN(index)) {
    throw new Error('index must be a number');
  }

  let next = source.next();
  let tempIndex = 0;
  while (!next.done) {
    if (tempIndex == index) {
      return next.value;
    }
    next = source.next();
    tempIndex++;
  }
  
  return null;
};