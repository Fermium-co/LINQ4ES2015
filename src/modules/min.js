"use strict";

import utils from "./utils";
import aggregate from "./aggregate";
import asEnumerable from "./asEnumerable";
import where from "./where";

export default function (source, predicate) {
  if (this !== undefined && this !== null && arguments.length < 2) {
    predicate = source;
    source = this;
  }
  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
  }
  let min = 0;
  if (typeof predicate == "function") {
    min = aggregate(where(source, predicate), undefined, (result, current) => result <= current ? result : current);
  }
  else {
    min = aggregate(source, undefined, (result, current) => result <= current ? result : current);
  }
  return min;
};