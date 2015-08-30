'use strict';

import utils from './utils';

export default function* (source) {
  if (this !== null && this !== undefined && arguments.length < 1) {
    source = this;
  }

  if (source == null || source == undefined) {
    throw new Error('source is null or undefined');
  }
  if (utils.isGenerator(source)) {
    throw new Error('enumerable may not be enumerated twice');
  }

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
};