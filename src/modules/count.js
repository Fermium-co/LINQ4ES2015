'use strict';

import utils from './utils';
import asEnumerable from './asEnumerable';

export default function (source, predicate) {
  if (this !== undefined && this !== null && arguments.length < 2) {
    predicate = source;
    source = this;
  }

  if (source == null || source == undefined) {
    throw new Error('source is null or undefined');
  }

  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
  }

  if (!(predicate instanceof Function)) {
    predicate = undefined;
  }

  let count = 0;
  let next = source.next();
  while (!next.done) {
    if (!predicate || predicate(next.value)) {
      count++;
    }
    next = source.next();
  }
  return count;
};