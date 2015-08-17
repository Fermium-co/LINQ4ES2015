"use strict";

import utils from "./modules/utils";
import asEnumerable from "./modules/asEnumerable";
import toArray from "./modules/toArray";
import where from "./modules/where";
import take from "./modules/take";
import select from "./modules/select";
import orderBy from "./modules/orderBy";
import orderByDescending from "./modules/orderByDescending";
import concat from "./modules/concat";
import range from "./modules/range";
import empty from "./modules/empty";
import repeat from "./modules/repeat";
import count from "./modules/count";
import first from "./modules/first";
import firstOrDefault from "./modules/firstOrDefault";
import last from "./modules/last";
import lastOrDefault from "./modules/lastOrDefault";
import single from "./modules/single";
import singleOrDefault from "./modules/singleOrDefault";
import any from "./modules/any";
import all from "./modules/all";
import defaultIfEmpty from "./modules/defaultIfEmpty";
import selectMany from "./modules/selectMany";
import aggregate from "./modules/aggregate";
import sum from "./modules/sum";

function setPrototype(prototype) {
  //prototype.asEnumerable = asEnumerable;
  prototype.toArray = toArray;
  prototype.where = where;
  prototype.take = take;
  prototype.select = select;
  prototype.orderBy = orderBy;
  prototype.orderByDescending = orderByDescending;
  prototype.concat = concat;
  prototype.count = count;
  prototype.first = first;
  prototype.firstOrDefault = firstOrDefault;
  prototype.last = last;
  prototype.lastOrDefault = lastOrDefault;
  prototype.single = single;
  prototype.singleOrDefault = singleOrDefault;
  prototype.any = any;
  prototype.all = all;
  prototype.defaultIfEmpty = defaultIfEmpty;
  prototype.selectMany = selectMany;
  prototype.aggregate = aggregate;
  prototype.sum = sum;
}

export default function () {
  //setPrototype(Array.prototype);
  setPrototype(utils.GeneratorFunctionProto);
  setPrototype(utils.GeneratorFunctionPrototype);

  Array.prototype.asEnumerable = asEnumerable;
}
