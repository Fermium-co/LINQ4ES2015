'use strict';

import utils from './utils';
import asEnumerable from './asEnumerable';
import toLookup from './toLookup';

export default function* (outer, inner, outerKeySelector, innerKeySelector, resultSelector, comparer) {
  if (this !== undefined && this !== null && arguments.length < 6 && utils.isFunc(inner)) {
    comparer = resultSelector;
    resultSelector = innerKeySelector;
    innerKeySelector = outerKeySelector;
    outerKeySelector = inner;
    inner = outer;
    outer = this;
  }

  if (outer == null || outer == undefined) {
    throw new Error('outer is null or undefined');
  }
  if (inner == null || inner == undefined) {
    throw new Error('inner is null or undefined');
  }
  if (outerKeySelector == null || outerKeySelector == undefined) {
    throw new Error('outerKeySelector is null or undefined');
  }
  if (innerKeySelector == null || innerKeySelector == undefined) {
    throw new Error('innerKeySelector is null or undefined');
  }
  if (resultSelector == null || resultSelector == undefined) {
    throw new Error('resultSelector is null or undefined');
  }

  if (!utils.isGenerator(outer)) {
    outer = asEnumerable(outer);
  }
  if (!utils.isGenerator(inner)) {
    inner = asEnumerable(inner);
  }

  if (!utils.isFunc(outerKeySelector)) {
    throw new Error('outerKeySelector must be a Function');
  }
  if (!utils.isFunc(innerKeySelector)) {
    throw new Error('innerKeySelector must be a Function');
  }

  if (!utils.isFunc(resultSelector)) {
    throw new Error('resultSelector must be a Function');
  }

  if (!utils.isFunc(comparer)) {
    comparer = (a, b) => a == b;
  }

  let lookupArray = toLookup(inner, innerKeySelector, a => a, comparer);
  let outerEnumerator = outer.next();
  while (!outerEnumerator.done) {
    let outerElement = outerEnumerator.value;
    let key = outerKeySelector(outerElement);
    let innerElements = findByKey(lookupArray, key, comparer);
    for (let index = 0; index < innerElements.length; index++) {
      let innerElement = innerElements[index];
      yield resultSelector(outerElement, innerElement);
    }
    outerEnumerator = outer.next();
  }
};

function findByKey(array, key, comparer) {
  for (let i = 0; i < array.length; i++) {
    let item = array[i];
    if (comparer(item.key, key)) {
      return item.elements;
    }
  }
}