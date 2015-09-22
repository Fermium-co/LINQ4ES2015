'use strict';

import utils from './utils';
import asEnumerable from './asEnumerable';

export default function (source, keySelector, elementSelector, comparer) {
  if (this !== undefined && this !== null && arguments.length < 4 && utils.isFunc(source)) {
    comparer = elementSelector;
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
  if (!utils.isFunc(keySelector)) {
    throw new Error('keySelector must be a function');
  }
  
  if (!utils.isFunc(elementSelector)) {
    elementSelector = a => a;
  }
  
  if (!utils.isFunc(comparer)) {
    comparer = (a, b) => a == b;
  }

  let lookup = new Lookup(comparer);
  let next = source.next();
  while (!next.done) {
    let key = keySelector(next.value);
    let element = elementSelector(next.value);
    lookup.add(key, element);
    next = source.next();
  }
  return lookup.getArray();
};

// ====================================================================================

class Lookup {

  constructor(comparer) {
    this.comparer = comparer;
    this.map = [];
    this.keys = [];
  }

  add(key, element) {
    let index = this.getKeyIndex(key);
    if (index === -1) {
      this.keys.push(key);
      index = this.keys.indexOf(key);
      this.map[index] = [];
    }
    this.map[index].push(element);
  }

  getKey(key) {
    for (let i = 0; i < this.keys.length; i++) {
      let item = this.keys[i];
      if (this.comparer(item, key)) {
        return item;
      }
    }
    return null;
  }

  getKeyIndex(key) {
    for (let index = 0; index < this.keys.length; index++) {
      let item = this.keys[index];
      if (this.comparer(item, key)) {
        return index;
      }
    }
    return -1;
  }

  get count() {
    return this.keys.length;
  }

  get(key) {
    let index = this.getKeyIndex(key);
    if (index === -1) return null;
    return this.map[index];
  }

  contains(key) {
    return !!this.getKey(key);
  }

  getArray() {
    let result = [];
    for (let index = 0; index < this.keys.length; index++) {
      let key = this.keys[index];
      result.push({ key: key, elements: this.map[index] });
    }
    return result;
  }
}