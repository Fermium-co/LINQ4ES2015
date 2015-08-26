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
  if (typeof index !== 'number' || index < 0) {
    return null;
  }

  if (Array.isArray(source)) {
    if (source.length === 0 || source.length <= index) {
      return null;
    } else if (source.length > index) {
      return source[index];
    }
  }

  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
  }

  let next = source.next();
  let currentIndex = 0;
  while (!next.done) {
    if (currentIndex == index) {
      return next.value;
    }
    next = source.next();
    currentIndex++;
  }
  return null;
};