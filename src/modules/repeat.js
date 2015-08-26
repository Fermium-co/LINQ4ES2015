'use strict';

import utils from './utils';

export default function* (element, count) {
  if (typeof count !== 'number') {
    throw new Error('count must be a number');
  }
  if (count < 0) {
    throw new Error('count may not be negative');
  }

  for (let i = 0; i < count; i++) {
    yield element;
  }
};