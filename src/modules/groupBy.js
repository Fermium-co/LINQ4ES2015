'use strict';

import utils from './utils';
import asEnumerable from './asEnumerable';
import toLookup from './toLookup';

export default function* (source, keySelector, elementSelector, resultSelector, comparer) {
  if (this !== undefined && this !== null && arguments.length < 5 && utils.isFunc(source)) {
    comparer = resultSelector;
    resultSelector = elementSelector;
    elementSelector = keySelector;
    keySelector = source;
    source = this;
  }
  
  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
  }
  
  if (keySelector == null || keySelector == undefined) {
    throw new Error('keySelector is null or undefined');
  }
  if (elementSelector == null || elementSelector == undefined) {
    throw new Error('elementSelector is null or undefined');
  }

  if (!utils.isFunc(keySelector)) {
    throw new Error('keySelector must be a Function');
  }
  if (!utils.isFunc(elementSelector)) {
    throw new Error('elementSelector must be a Function');
  }

  if (!utils.isFunc(comparer)) {
    comparer = (a, b) => a == b;
  }
  if (!utils.isFunc(resultSelector)) {
    resultSelector = undefined;
  }

  let lookup = toLookup(source, keySelector, elementSelector, comparer);
  for (let i = 0; i < lookup.length; i++) {
    let item = lookup[i];
    yield resultSelector ? resultSelector(item.key, item.elements) : item;
  }
};