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
  let max = 0;
  if (typeof predicate == "function") {
    max = aggregate(where(source, predicate), undefined, (result, current) => result >= current ? result : current);
  }
  else {
    max = aggregate(source, undefined, (result, current) => result >= current ? result : current);
  }
  return max;
};