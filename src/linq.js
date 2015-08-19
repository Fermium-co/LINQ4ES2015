'use strict';

import aggregate from './modules/aggregate';
import all from './modules/all';
import any from './modules/any';
import asEnumerable from './modules/asEnumerable';
import average from './modules/average';
import concat from './modules/concat';
import contains from './modules/contains';
import count from './modules/count';
import defaultIfEmpty from './modules/defaultIfEmpty';
import distinct from './modules/distinct';
import elementAt from './modules/elementAt';
import elementAtOrDefault from './modules/elementAtOrDefault';
import empty from './modules/empty';
import except from './modules/except';
import first from './modules/first';
import firstOrDefault from './modules/firstOrDefault';
import groupBy from './modules/groupBy';
import intersect from './modules/intersect';
import join from './modules/join';
import last from './modules/last';
import lastOrDefault from './modules/lastOrDefault';
import max from './modules/max';
import min from './modules/min';
import orderBy from './modules/orderBy';
import orderByDescending from './modules/orderByDescending';
import range from './modules/range';
import repeat from './modules/repeat';
import select from './modules/select';
import selectMany from './modules/selectMany';
import sequenceEqual from './modules/sequenceEqual';
import single from './modules/single';
import singleOrDefault from './modules/singleOrDefault';
import skip from './modules/skip';
import skipWhile from './modules/skipWhile';
import sum from './modules/sum';
import take from './modules/take';
import takeWhile from './modules/takeWhile'
import toArray from './modules/toArray';
import toLookup from './modules/toLookup';
import union from './modules/union';
import where from './modules/where';

import utils from './modules/utils';
import thenBy from './modules/thenBy';
import thenByDescending from './modules/thenByDescending';

function setPrototype(prototype) {
  prototype.aggregate = aggregate;
  prototype.all = all;
  prototype.any = any;
  prototype.average = average;
  prototype.concat = concat;
  prototype.contains = contains;
  prototype.count = count;
  prototype.defaultIfEmpty = defaultIfEmpty;
  prototype.distinct = distinct;
  prototype.elementAt = elementAt;
  prototype.elementAtOrDefault = elementAtOrDefault;
  prototype.except = except;
  prototype.first = first;
  prototype.firstOrDefault = firstOrDefault;
  prototype.groupBy = groupBy;
  prototype.intersect = intersect;
  prototype.join = join;
  prototype.last = last;
  prototype.lastOrDefault = lastOrDefault;
  prototype.max = max;
  prototype.min = min;
  prototype.orderBy = orderBy;
  prototype.orderByDescending = orderByDescending;
  prototype.select = select;
  prototype.selectMany = selectMany;
  prototype.sequenceEqual = sequenceEqual;
  prototype.single = single;
  prototype.singleOrDefault = singleOrDefault;
  prototype.skip = skip;
  prototype.skipWhile = skipWhile;
  prototype.sum = sum;
  prototype.take = take;
  prototype.takeWhile = takeWhile;
  prototype.toArray = toArray;
  prototype.toLookup = toLookup;
  prototype.union = union;
  prototype.where = where;

  prototype.thenBy = thenBy;
  prototype.thenByDescending = thenByDescending;
}

export default class Linq {
  static initLinqExtensions() {
    setPrototype(utils.GeneratorFunctionProto);
    setPrototype(utils.GeneratorFunctionPrototype);
    Array.prototype.asEnumerable = asEnumerable;
  }
  static repeat() {
    return repeat.apply(this, arguments);
  }
  static range() {
    return range.apply(this, arguments);
  }
}  

