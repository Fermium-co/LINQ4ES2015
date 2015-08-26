'use strict';

import utils from './utils';
import asEnumerable from './asEnumerable';

export default function (source, selector) {
  if (this !== undefined && this !== null && arguments.length < 2) {
    selector = source;
    source = this;
  }

  if (source == null || source == undefined) {
    throw new Error('source is null or undefined');
  }

  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
  }

  if (!(selector instanceof Function)) {
    selector = a => a;
  }

  let next = source.next();
  if (next.done) {
    throw new Error('sequence is empty');
  }
  let max = next.value;
  while (!next.done) {
    let item = selector(next.value);
    if (item > selector(max)) {
      max = next.value;
    }
    next = source.next();
  }
  return max;
};