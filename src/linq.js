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
import groupJoin from './modules/groupJoin';
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
import reverse from './modules/reverse';
import select from './modules/select';
import selectMany from './modules/selectMany';
import sequenceEqual from './modules/sequenceEqual';
import single from './modules/single';
import singleOrDefault from './modules/singleOrDefault';
import skip from './modules/skip';
import skipWhile from './modules/skipWhile';
import sortBy from './modules/sortBy';
import sum from './modules/sum';
import take from './modules/take';
import takeWhile from './modules/takeWhile'
import thenBy from './modules/thenBy';
import thenByDescending from './modules/thenByDescending';
import toArray from './modules/toArray';
import toLookup from './modules/toLookup';
import union from './modules/union';
import where from './modules/where';
import utils from './modules/utils';
import zip from './modules/zip';

function getLinqExtensionsMap() {
  return {
    aggregate: aggregate,
    all: all,
    any: any,
    average: average,
    concat: concat,
    contains: contains,
    count: count,
    defaultIfEmpty: defaultIfEmpty,
    distinct: distinct,
    elementAt: elementAt,
    elementAtOrDefault: elementAtOrDefault,
    except: except,
    first: first,
    firstOrDefault: firstOrDefault,
    groupBy: groupBy,
    groupJoin: groupJoin,
    intersect: intersect,
    join: join,
    last: last,
    lastOrDefault: lastOrDefault,
    max: max,
    min: min,
    orderBy: orderBy,
    orderByDescending: orderByDescending,
    reverse: reverse,
    select: select,
    selectMany: selectMany,
    sequenceEqual: sequenceEqual,
    single: single,
    singleOrDefault: singleOrDefault,
    skip: skip,
    skipWhile: skipWhile,
    sortBy: sortBy,
    sum: sum,
    take: take,
    takeWhile: takeWhile,
    thenBy: thenBy,
    thenByDescending: thenByDescending,
    toArray: toArray,
    toLookup: toLookup,
    union: union,
    where: where,
    zip: zip
  };
}

export default class Linq {
  static setExtensions() {
    
    let linqExtensionsMap = getLinqExtensionsMap();
    
    utils.defineProperties(utils.GeneratorFunctionProto, linqExtensionsMap);
    utils.defineProperties(utils.GeneratorFunctionPrototype, linqExtensionsMap);
    
    let asEnumerableExtensionMap = { asEnumerable: asEnumerable };
    
    utils.defineProperties(Array.prototype, asEnumerableExtensionMap);
    utils.defineProperties(String.prototype, asEnumerableExtensionMap);

    // it is too general, but if you know what you're doing you can use this:
    //utils.defineProperties(Object.prototype, extensionMap);

    // you can add linq functions to Array and/or String prototype too, but its way too general:
    //setPrototype(Array.prototype);
    //setPrototype(String.prototype);
  }
  static repeat() {
    return repeat.apply(this, arguments);
  }
  static range() {
    return range.apply(this, arguments);
  }

  static empty() {
    return empty.apply(this, arguments);
  }
  static asEnumerable() {
    return asEnumerable.apply(this, arguments);
  }

  static aggregate() {
    return aggregate.apply(this, arguments);
  }
  static all() {
    return all.apply(this, arguments);
  }
  static any() {
    return any.apply(this, arguments);
  }
  static average() {
    return average.apply(this, arguments);
  }
  static concat() {
    return concat.apply(this, arguments);
  }
  static contains() {
    return contains.apply(this, arguments);
  }
  static count() {
    return count.apply(this, arguments);
  }
  static defaultIfEmpty() {
    return defaultIfEmpty.apply(this, arguments);
  }
  static distinct() {
    return distinct.apply(this, arguments);
  }
  static elementAt() {
    return elementAt.apply(this, arguments);
  }
  static elementAtOrDefault() {
    return elementAtOrDefault.apply(this, arguments);
  }
  static except() {
    return except.apply(this, arguments);
  }
  static first() {
    return first.apply(this, arguments);
  }
  static firstOrDefault() {
    return firstOrDefault.apply(this, arguments);
  }
  static groupBy() {
    return groupBy.apply(this, arguments);
  }
  static groupJoin() {
    return groupJoin.apply(this, arguments);
  }
  static intersect() {
    return intersect.apply(this, arguments);
  }
  static join() {
    return join.apply(this, arguments);
  }
  static last() {
    return last.apply(this, arguments);
  }
  static lastOrDefault() {
    return lastOrDefault.apply(this, arguments);
  }
  static max() {
    return max.apply(this, arguments);
  }
  static min() {
    return min.apply(this, arguments);
  }
  static orderBy() {
    return orderBy.apply(this, arguments);
  }
  static orderByDescending() {
    return orderByDescending.apply(this, arguments);
  }
  static reverse() {
    return reverse.apply(this, arguments);
  }
  static select() {
    return select.apply(this, arguments);
  }
  static selectMany() {
    return selectMany.apply(this, arguments);
  }
  static sequenceEqual() {
    return sequenceEqual.apply(this, arguments);
  }
  static single() {
    return single.apply(this, arguments);
  }
  static singleOrDefault() {
    return singleOrDefault.apply(this, arguments);
  }
  static skip() {
    return skip.apply(this, arguments);
  }
  static skipWhile() {
    return skipWhile.apply(this, arguments);
  }
  static sortBy() {
    return sortBy.apply(this, arguments);
  }
  static sum() {
    return sum.apply(this, arguments);
  }
  static take() {
    return take.apply(this, arguments);
  }
  static takeWhile() {
    return takeWhile.apply(this, arguments);
  }
  static thenBy() {
    return thenBy.apply(this, arguments);
  }
  static thenByDescending() {
    return thenByDescending.apply(this, arguments);
  }
  static toArray() {
    return toArray.apply(this, arguments);
  }
  static toLookup() {
    return toLookup.apply(this, arguments);
  }
  static union() {
    return union.apply(this, arguments);
  }
  static where() {
    return where.apply(this, arguments);
  }
  static zip() {
    return zip.apply(this, arguments);
  }
}
