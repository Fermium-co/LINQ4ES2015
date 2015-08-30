'use  strict';

import utils from './utils';
import asEnumerable from './asEnumerable';

export default function* (source) {
  if (this !== undefined && this !== null && arguments.length < 1) {
    source = this;
  }
  
  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
  }

  let next = source.next();
  let resultArray = [];

  while (!next.done) {
    resultArray.unshift(next.value);
    next = source.next();
  }

  for (let i = 0; i < resultArray.length; i++) {
    yield resultArray[i];
  }

}