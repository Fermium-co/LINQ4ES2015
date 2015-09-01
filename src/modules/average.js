'use strict';

import utils from './utils';
import asEnumerable from './asEnumerable';

export default function (source, selector) {
  if (this !== undefined && this !== null && arguments.length < 2 && (!source || source instanceof Function)) {
    selector = source;
    source = this;
  }
  
  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
  }

  if (!(selector instanceof Function)) {
    selector = undefined;
  }

  let total = 0;
  let count = 0;
  let next = source.next();
  if (next.done) {
    throw new Error('sequence is empty');
  }
  while (!next.done) {
    count++;
    total += selector ? selector(next.value) : next.value;
    next = source.next();
  }
  return total / count;
};