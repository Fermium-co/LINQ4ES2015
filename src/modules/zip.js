'use strict';

import utils from './utils';
import asEnumerable from './asEnumerable';

export default function* (first, second, resultSelector) {
  if (this !== undefined && this !== null && arguments.length < 3) {
    resultSelector = second;
    second = first;
    first = this;
  }

  if (first == null || first == undefined) {
    throw new Error('first source is null or undefined');
  }
  if (second == null || second == undefined) {
    throw new Error('second source is null or undefined');
  }
  if (resultSelector == null || resultSelector == undefined) {
    throw new Error('resultSelector is null or undefined');
  }

  if (!utils.isGenerator(first)) {
    first = asEnumerable(first);
  }
  if (!utils.isGenerator(second)) {
    second = asEnumerable(second);
  }
  if (!utils.isFunc(resultSelector)) {
    throw new Error('resultSelector must be a function');
  }

  let next1 = first.next();
  let next2 = second.next();
  while (!next1.done && !next2.done) {
    yield resultSelector(next1.value, next2.value);
    next1 = first.next();
    next2 = second.next();
  }
};