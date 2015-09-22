'use strict';

import utils from './utils';
import asEnumerable from './asEnumerable';
import toArray from './toArray';
import OrderedEnumerable, {ReverseComparer} from './OrderedEnumerable';

let extract = e => {
  let options = []; 
  if (!utils.isFunc(e[0])) { // keySelector
    throw new Error('keySelector must be a function');
  }
  options.push(e[0]);
  let index = 1;

  if (typeof e[index] === 'boolean') { // isDescending
    options.push(e[index]);
    index++;
  } else {
    options.push(false);
  }

  if (utils.isFunc(e[index])) { // comparer
    options.push(e[index]);
  } else {
    options.push(utils.defaultComparer);
  }

  return options;
};

export default function* (...args) {
  let source = args[0];
  let startIndex = 1;
  if (!utils.canBeEnumerated(source) || utils.canBeEnumerated(this)) {
    source = this;
    startIndex = 0;
  }

  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
  }  

  let optionsCollection = [];
  for (var i = startIndex; i < args.length; i++) {
    var e = args[i];

    if (Array.isArray(e)) {
      optionsCollection.push(extract(e));
    } else if (utils.isFunc(e)) {
      optionsCollection.push([e, false, utils.defaultComparer]);
    } else if (typeof e === 'object') {
      let e2 = [];
      e2.push(e.k || e.key || e.keySelector);
      e2.push(e.d || e.des || e.descending || e.isDes || e.isDescending || false);
      e2.push(e.c || e.comp || e.comparer || utils.defaultComparer);
      optionsCollection.push(extract(e2));
    }
  }

  let firstOptions = optionsCollection[0];
  source.orderedEnumerable = new OrderedEnumerable(source, firstOptions[0], firstOptions[1] ? new ReverseComparer(firstOptions[2]) : firstOptions[2]);
  optionsCollection.splice(0, 1);
  optionsCollection.forEach(opt => {
    source.orderedEnumerable = source.orderedEnumerable.combine(opt[0], opt[1] ? new ReverseComparer(opt[2]) : opt[2]);
  });

  let enumerable = source.orderedEnumerable.getEnumerator();
  let next = enumerable.next();
  while (!next.done) {
    yield next.value;
    next = enumerable.next();
  }
};