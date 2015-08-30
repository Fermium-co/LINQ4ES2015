'use strict';

import utils from './utils';
import asEnumerable from './asEnumerable'

export default function* (source, defaultValue) {
  if (this !== undefined && this !== null && arguments.length < 2) { // TODO: solve it::  Linq.defaultIfEmpty([1,2,3].asEnumerable());
    defaultValue = source;
    source = this;
  }
  
  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
  }

  let next = source.next();
  if (next.done) {
    yield defaultValue;
  }
  while (!next.done) {
    yield next.value;
    next = source.next();
  }
}