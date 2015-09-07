'use strict';

import utils from './utils';

export default function* (source) {
  // console.log('this is source: 0-0');
  // console.log(source);
  
  if (this !== null && this !== undefined && arguments.length === 0) {
    source = this;
  }

  // console.log('this is source: 0-1');
  // console.log(source);
  if (source == null || source == undefined) {
    throw new Error('source is null or undefined');
  }
  // console.log('this is source: 0-2');
  // console.log(source);

  if (utils.isGenerator(source)) {
    yield* source;
  } else {
    if (Array.isArray(source) || typeof source === 'string' || source instanceof String) {
      for (let index = 0; index < source.length; index++) {
        yield source[index];
      }
    } else if (source !== null && typeof source === 'object') {
      for (let key in source) {
        if (source.hasOwnProperty(key)) {
          yield { key: key, value: source[key] };
        }
      }
    }
    else {
      throw new Error('source can not be enumerated');
    }
  }
};