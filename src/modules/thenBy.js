'use strict';

import utils from './utils';
import asEnumerable from './asEnumerable';
import toArray from './toArray';

export default function* (source, keySelector, comparer) {
  if (this !== undefined && this !== null && arguments.length < 3 && source instanceof Function) {
    comparer = keySelector;
    keySelector = source;
    source = this;
  }
  
  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
  }
  
  if (!source.orderedEnumerable) {
    throw new Error('source must be an OrderedEnumerable');
  }

  if (keySelector == null || keySelector == undefined) {
    throw new Error('keySelector is null or undefined');
  }
  if (!(keySelector instanceof Function)) {
    throw new Error('keySelector must be a function');
  }

  if (!(comparer instanceof Function)) {
    comparer = (a, b) => {
      if (a > b) return 1;
      if (a == b) return 0;
      return -1;
    };
  }
  
  source.orderedEnumerable = source.orderedEnumerable.combine(keySelector, comparer, false);

  let enumerable = source.orderedEnumerable.getEnumerator();
  let next = enumerable.next();
  while (!next.done) {
    yield next.value;
    next = enumerable.next();
  }
};