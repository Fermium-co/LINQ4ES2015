'use strict';

import utils from './utils';
import asEnumerable from './asEnumerable';

export default function (source, index) {
  if (this !== undefined && this !== null && arguments.length < 2) {
    index = source;
    source = this;
  }

  if (source == null || source == undefined) {
    throw new Error('source is null or undefined');
  }
  if (typeof index !== 'number') {
    throw new Error('index must be a number');
  }
  if (index < 0) {
    throw new Error('index must be non-negetive');
  }

  if (Array.isArray(source)) {
    if (source.length === 0) {
      throw new Error('sequence contains no elements');
    } else if (source.length <= index) {
      throw new Error('index is out of range');
    } else if (source.length > index) {
      return source[index];
    }
  }

  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
  }

  let next = source.next();
  if (next.done) {
    throw new Error('sequence contains no elements');
  }
  let currentIndex = 0;
  while (!next.done) {
    if (currentIndex == index) {
      return next.value;
    }
    next = source.next();
    currentIndex++;
  }
  throw new Error('index is out of range');
};