"use strict";

import utils from "./utils";
import asEnumerable from './asEnumerable';
import toLookup from './toLookup';

export default function* (source, keySelector, elementSelector, resultSelector, comparer) {
  if (this !== undefined && this !== null && arguments.length < 5) {
    comparer = resultSelector;
    resultSelector = elementSelector;
    elementSelector = keySelector;
    keySelector = source;
    source = this;
  }
  if (source == null || source == undefined) {
    throw new Error("source is null or undefined");
  }
  if (keySelector == null || keySelector == undefined) {
    throw new Error("keySelector is null or undefined");
  }
  if (elementSelector == null || elementSelector == undefined) {
    throw new Error("elementSelector is null or undefined");
  }

  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
  }

  if (!(keySelector instanceof Function)) {
    throw new Error('keySelector must be a Function');
  }
  if (!(elementSelector instanceof Function)) {
    throw new Error('elementSelector must be a Function');
  }

  if (!(comparer instanceof Function)) {
    comparer = (a, b) => a == b;
  }
  if (!(resultSelector instanceof Function)) {
    resultSelector = undefined;
  }

  let lookup = toLookup(source, keySelector, elementSelector, comparer);
  for (let i = 0; i < lookup.length; i++) {
    let item = lookup[i];
    yield resultSelector ? resultSelector(item.key, item.elements) : item;
  }
};