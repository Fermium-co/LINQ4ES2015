'use strict';

import utils from './utils';
import asEnumerable from './asEnumerable';

export default function (source, predicate) {
  if (this !== undefined && this !== null && arguments.length < 2 && (!source || source instanceof Function)) {
    predicate = source;
    source = this;
  }

  if (Array.isArray(source)) {
    if (!predicate && source.length > 0) {
      return true;
    }
  }

  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
  }

  if (!(predicate instanceof Function)) {
    predicate = undefined;
  }

  let next = source.next();
  if (!predicate) {
    return !next.done;
  }

  while (!next.done) {
    if (predicate(next.value)) {
      return true;
    }
    next = source.next();
  }
  return false;
}