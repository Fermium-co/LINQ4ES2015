'use strict';

import utils from './utils';
import asEnumerable from './asEnumerable'

export default function* (source, collectionSelector, resultSelector) {
  if (this !== undefined && this !== null && arguments.length < 3) {
    resultSelector = collectionSelector;
    collectionSelector = source;
    source = this;
  }

  if (source == null || source == undefined) {
    throw new Error('source is null or undefined');
  }
  if (collectionSelector == null || collectionSelector == undefined) {
    throw new Error('collectionSelector is null or undefined');
  }

  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
  }
  if (!(collectionSelector instanceof Function)) {
    throw new Error('collectionSelector must be a function');
  }

  let next = source.next();
  let index = 0;
  while (!next.done) {
    let innerEnumerable = collectionSelector(next.value, index++);
    if (!utils.isGenerator(innerEnumerable)) {
      innerEnumerable = asEnumerable(innerEnumerable);
    }
    let innerNext = innerEnumerable.next();
    while (!innerNext.done) {
      yield resultSelector ? resultSelector(innerNext.value, next.value) : innerNext.value;
      innerNext = innerEnumerable.next();
    }
    next = source.next();
  }
};