"use strict";

import utils from "./utils";

export default function* (source, predicate) {
  if (arguments.length < 2) {
    predicate = source;
    source = this;
  }
  if (source == null || source == undefined) {
    throw  new Error("source is null or undefined");
  }
  if (predicate == null || predicate == undefined) {
    throw new Error("predicate is null or undefined");
  }
  if (source.length == 0)
    return true;

  let next = source.next();

  while (!next.done) {
    if (!predicate(next.value))
      return false;
    next = source.next();
  }

  return true;
}
