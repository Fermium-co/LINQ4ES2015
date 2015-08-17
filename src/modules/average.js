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
  if (!utils.isGenerator(source))
    source = asEnumerable(source);
  let sum = 0;
  let count = 0;
  if (typeof predicate == "function") {
    sum = aggregate(where(source, predicate), 0, (result, current) => { count++; return result += current; });
  }
  else {
    sum = aggregate(source, 0, (result, current) => { count++; return result += current; });
  }
  return sum / count;
};