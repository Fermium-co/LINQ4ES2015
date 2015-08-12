"use strict";

import utils from "./modules/utils";
import asEnumerable from "./modules/asEnumerable";
import toArray from "./modules/toArray";
import where from "./modules/where";
import take from "./modules/take";
import select from "./modules/select";
import orderBy from "./modules/orderBy";

function setPrototype(prototype) {
	prototype.asEnumerable = asEnumerable;
	prototype.toArray = toArray;
	prototype.where = where;
	prototype.take = take;
	prototype.select = select;
	prototype.orderBy = orderBy;
}

export default function () {
	//setPrototype(Array.prototype);
	setPrototype(utils.GeneratorFunctionProto);
	setPrototype(utils.GeneratorFunctionPrototype);

	Array.prototype.asEnumerable = asEnumerable;
}