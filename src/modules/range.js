"use strict";

import utils from "./utils";

export default function* (start, count) {
	if (count < 0) {
		throw new Error("count may not be negative");
	}
	if (isNaN(count)) {
		throw new Error("count must be a number type");
	}
	if (isNaN(start)) {
		throw new Error("start must be a number type");
	}

	for (let i = 0; i < count; i++) {
		yield start++;
	}
};