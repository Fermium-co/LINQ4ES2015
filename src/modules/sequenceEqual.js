'use strict';

import utils from './utils';
import asEnumerable from './asEnumerable';

export default function (first, second, comparer) {
  if (this !== undefined && this !== null && arguments.length < 3 && (!second || utils.isFunc(second))) {
    comparer = second;
    second = first;
    first = this;
  }

  if (first == null || first == undefined) {
    throw new Error('first is null or undefined');
  }
  if (second == null || second == undefined) {
    throw new Error('second is null or undefined');
  }

  if (Array.isArray(first) && Array.isArray(second)) {
    if (first.length != second.length) {
      return false;
    }
  }

  if (!utils.isGenerator(first)) {
    first = asEnumerable(first);
  }
  if (!utils.isGenerator(second)) {
    second = asEnumerable(second);
  }

  if (!utils.isFunc(comparer)) {
    comparer = (a, b) => a == b;
  }

  while (true) {
    let next1 = first.next();
    let next2 = second.next();
    if (next1.done != next2.done) {
      return false;
    }
    if (next1.done) {
      return true;
    }
    if (!comparer(next1.value, next2.value)) {
      return false;
    }
  }
};