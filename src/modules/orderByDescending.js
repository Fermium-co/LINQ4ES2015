'use strict';

import utils from './utils';
import asEnumerable from './asEnumerable';
import toArray from './toArray';
import {ReverseComparer} from './OrderedEnumerable';
import orderBy from './orderBy';

export default function* (source, keySelectors, comparer) {
  if (this !== undefined && this !== null && arguments.length < 3 && (!source || Array.isArray(source) || utils.isFunc(source))) {
    comparer = keySelectors;
    keySelectors = source;
    source = this;
  }

  if (!comparer || (!utils.isFunc(comparer) && !utils.isFunc(comparer.compare))) {
    comparer = utils.defaultComparer;
  } else if (utils.isFunc(comparer)) {
    comparer = { compare: comparer };
  }

  yield* orderBy(source, keySelectors, new ReverseComparer(comparer));
};