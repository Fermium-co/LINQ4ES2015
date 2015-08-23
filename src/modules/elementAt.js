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
    if (source.length === 0) {
      throw new Error("Sequence contains no elements");
    }
    else if (source.length > index) {
      return source[index];
    }
    else if (source.length < index) {
      throw new Error("Index was out of range. Must be non-negative and less than the size of the collection");
    }
    source = asEnumerable(source);
  }
  if (!utils.isGenerator(source)) {
    throw new Error("source must be an enumerable");
  }

  if (isNaN(index)) {
    throw new Error("index must be a number");
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

  if (tempIndex == 0) {
    throw new Error("Sequence contains no elements");
  }
  else {
    throw new Error("Index was out of range. Must be non-negative and less than the size of the collection");
  }
};