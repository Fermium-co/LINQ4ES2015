'use strict';

import utils from './utils';
import asEnumerable from './asEnumerable';

export default function (source, predicate) {
  if (this !== undefined && this !== null && arguments.length < 2 && (!source || utils.isFunc(source))) {
    predicate = source;
    source = this;
  }
  
  if (Array.isArray(source)) {
    if (!predicate) {
      return source.length === 0 ? null : source[0];
    }
  }
  
  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
  }

  if (!utils.isFunc(predicate)) {
    predicate = undefined;
  }

  let next = source.next();
  if (!predicate) {
    if (!next.done) {
      return next.value;
    }
  } else {
    while (!next.done) {
      if (predicate(next.value)) {
        return next.value;
      }
      next = source.next();
    }
  }
  return null;
};