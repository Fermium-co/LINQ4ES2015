'use strict';

import utils from './utils';

export default function* (start, count) {
  if (typeof start !== 'number') {
    throw new Error('start must be a number');
  }
  if (typeof count !== 'number') {
    throw new Error('count must be a number');
  }
  if (count < 0) {
    throw new Error('count may not be negative');
  }

  let end = start + count;
  for (let i = start; i < end; i++) {
    yield i;
  }
};