'use strict';

import utils from './utils';
import asEnumerable from './asEnumerable';

export default function (source) {
  if (this !== null && this !== undefined && arguments.length < 1) {
    source = this;
  }
  
  if (Array.isArray(source)) {
    return source;
  }

  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
  }

  let result = [];
  let next = source.next();
  while (!next.done) {
    result.push(next.value);
    next = source.next();
  }
  return result;
};