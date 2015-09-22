'use strict';

import utils from './utils';
import asEnumerable from './asEnumerable';
import toArray from './toArray';
import OrderedEnumerable from './OrderedEnumerable';

export default function* (source, keySelectors, comparer) {
  if (this !== undefined && this !== null && arguments.length < 3 && (!source || Array.isArray(source) || utils.isFunc(source))) {
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

  if (!Array.isArray(keySelectors)) {
    if (!utils.isFunc(keySelectors)) {
      throw new Error('keySelector must be a function');
    }
    keySelectors = [keySelectors];
  }

  if (!comparer || (!utils.isFunc(comparer) && !utils.isFunc(comparer.compare))) {
    comparer = utils.defaultComparer;
  } else if (utils.isFunc(comparer)) {
    comparer = { compare: comparer };
  }

  source.orderedEnumerable = new OrderedEnumerable(source, keySelectors[0], comparer);
  keySelectors.splice(0, 1);
  keySelectors.forEach((k) => {
    source.orderedEnumerable = source.orderedEnumerable.combine(k, comparer);
  });

  yield* source.orderedEnumerable.getEnumerator();
};