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
  if (predicate == null || predicate == undefined) {
    throw new Error('predicate is null or undefined');
  }

  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
  }

  let next = source.next();
  while (!next.done) {
    if (!predicate(next.value)) {
      return false;
    }
    next = source.next();
  }
  return true;
}
