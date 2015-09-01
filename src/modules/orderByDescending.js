'use strict';

import utils from './utils';
import asEnumerable from './asEnumerable';
import toArray from './toArray';
import OrderedEnumerable, {ReverseComparer} from './OrderedEnumerable';

export default function* (source, keySelector, comparer) {
  if (this !== undefined && this !== null && arguments.length < 3 && (!source || Array.isArray(source) || source instanceof Function)) {
    comparer = keySelector;
    keySelector = source;
    source = this;
  }

  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
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

  comparer = { compare: comparer };
  let sourceComparer = new ReverseComparer(comparer);
  source.orderedEnumerable = new OrderedEnumerable(source, keySelector, sourceComparer);

  let enumerable = source.orderedEnumerable.getEnumerator();
  let next = enumerable.next();
  while (!next.done) {
    yield next.value;
    next = enumerable.next();
  }
};