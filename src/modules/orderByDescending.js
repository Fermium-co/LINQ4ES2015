'use strict';

import utils from './utils';
import asEnumerable from './asEnumerable';
import toArray from './toArray';
import OrderedEnumerable, {ReverseComparer} from './OrderedEnumerable';

export default function* (source, keySelectors, comparer) {
  if (this !== undefined && this !== null && arguments.length < 3 && (!source || Array.isArray(source) || source instanceof Function)) {
    comparer = keySelectors;
    keySelectors = source;
    source = this;
  }

  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
  }

  if (keySelectors == null || keySelectors == undefined) {
    throw new Error('keySelector is null or undefined');
  }

  if (Array.isArray(keySelectors)) {

  } else if (!(keySelectors instanceof Function)) {
    throw new Error('keySelector must be a function');
  } else {
    keySelectors = [keySelectors];
  }

  if (!(comparer instanceof Function)) {
    comparer = (a, b) => {
      if (a > b) return 1;
      if (a == b) return 0;
      return -1;
    };
  }
  
  // let sortedResults = toArray(source).sort((a, b) => -comparer(keySelector(a), keySelector(b)));
  // for (let index = 0; index < sortedResults.length; index++) {
  //   let element = sortedResults[index];
  //   yield element;
  // }
  
  comparer = { compare: comparer };
  let sourceComparer = new ReverseComparer(comparer);
  source.orderedEnumerable = new OrderedEnumerable(source, keySelectors[0], sourceComparer);
  keySelectors.splice(0, 1);
  keySelectors.forEach((k) => {
    source.orderedEnumerable = source.orderedEnumerable.combine(k, comparer, true);
  });

  let enumerable = source.orderedEnumerable.getEnumerator();
  let next = enumerable.next();
  while (!next.done) {
    yield next.value;
    next = enumerable.next();
  }
};