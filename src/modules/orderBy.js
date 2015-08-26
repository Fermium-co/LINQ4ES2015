'use strict';

import utils from './utils';
import asEnumerable from './asEnumerable';
import toArray from './toArray';

export default function* (source, keySelector, comparer) {
  if (this !== undefined && this !== null && arguments.length < 3) {
    comparer = keySelector;
    keySelector = source;
    source = this;
  }

  if (source == null || source == undefined) {
    throw new Error('source is null or undefined');
  }
  if (keySelector == null || keySelector == undefined) {
    throw new Error('keySelector is null or undefined');
  }

  if (!(keySelector instanceof Function)) {
    throw new Error('keySelector must be a function');
  }

  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
  }

  if (!(comparer instanceof Function)) {
    comparer = (a, b) => {
      if (a > b) return 1;
      if (a == b) return 0;
      return -1;
    };
  }

  let sortedResults = toArray(source).sort((a, b) => comparer(keySelector(a), keySelector(b)));

  for (let index = 0; index < sortedResults.length; index++) {
    let element = sortedResults[index];
    yield element;
  }
};