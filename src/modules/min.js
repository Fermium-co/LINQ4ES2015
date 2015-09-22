'use strict';

import utils from './utils';
import asEnumerable from './asEnumerable';

export default function (source, selector) {
  if (this !== undefined && this !== null && arguments.length < 2 && (!source || utils.isFunc(source))) {
    selector = source;
    source = this;
  }
  
  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
  }

  if (!utils.isFunc(selector)) {
    selector = a => a;
  }

  let next = source.next();
  if (next.done) {
    throw new Error('sequence is empty');
  }
  let min = next.value;
  while (!next.done) {
    let item = selector(next.value);
    if (item < selector(min)) {
      min = item;
    }
    next = source.next();
  }
  return min;
};