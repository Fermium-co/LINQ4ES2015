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
      if (source.length === 0) throw new Error('Sequence contains no elements');
      if (source.length !== 1) throw new Error('Sequence contains more than one element');
      return source[0];
    }
  }
  
  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
  }

  if (!utils.isFunc(predicate)) {
    predicate = undefined;
  }

  let next = source.next();
  let result = next.value;
  if (!predicate) {
    if (next.done) {
      throw new Error('Sequence contains no elements');
    }
    next = source.next();
    if (!next.done) {
      throw new Error('Sequence contains more than one element');
    }
    return result;
  }

  let found = false;
  while (!next.done) {
    if (predicate(next.value)) {
      if (found) {
        throw new Error('Sequence contains no matching element');
      }
      found = true;
      result = next.value;
    }
    next = source.next();
  }
  if (!found) {
    throw new Error('Sequence contains no matching element');
  }
  return result;
};