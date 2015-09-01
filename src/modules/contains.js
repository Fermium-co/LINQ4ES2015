'use strict';

import utils from './utils';
import asEnumerable from './asEnumerable';

export default function (source, value, comparer) {
  if (this !== undefined && this !== null && arguments.length < 3 && (!value || value instanceof Function)) {
    comparer = value;
    value = source;
    source = this;
  }

  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
  }

  if (!(comparer instanceof Function)) {
    comparer = (a, b) => a == b;
  }

  let next = source.next();
  while (!next.done) {
    if (comparer(value, next.value)) {
      return true;
    }
    next = source.next();
  }
  return false;
}