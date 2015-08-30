'use strict';

import utils from './utils';
import asEnumerable from './asEnumerable';

export default function* (firstSource, secondSource) {
  if (this !== undefined && this !== null && arguments.length < 2) {
    secondSource = firstSource;
    firstSource = this;
  }
  if (firstSource == null || firstSource == undefined) {
    throw new Error('first source is null or undefined');
  }
  if (secondSource == null || secondSource == undefined) {
    throw new Error('second source is null or undefined');
  }
  
  if (!utils.isGenerator(firstSource)) {
    firstSource = asEnumerable(firstSource);
  }
  if (!utils.isGenerator(secondSource)) {
    secondSource = asEnumerable(secondSource);
  }

  let next = firstSource.next();
  while (!next.done) {
    yield next.value;
    next = firstSource.next();
  }

  next = secondSource.next();
  while (!next.done) {
    yield next.value;
    next = secondSource.next();
  }
};