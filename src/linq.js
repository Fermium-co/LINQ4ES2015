"use strict";

import utils from "./modules/utils";
import asEnumerable from "./modules/asEnumerable";
import toArray from "./modules/toArray";
import where from "./modules/where";
import take from "./modules/take";

function setPrototype(prototype) {
	prototype.asEnumerable = asEnumerable;
	prototype.toArray = toArray;
	prototype.where = where;
	prototype.take = take;
}

export default function () {
	//setPrototype(Array.prototype);
	setPrototype(utils.GeneratorFunctionProto);
	setPrototype(utils.GeneratorFunctionPrototype);
	
	Array.prototype.asEnumerable = asEnumerable;
}