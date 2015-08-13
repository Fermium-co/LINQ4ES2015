/* global toThrowError */
/* global describe, it, expect, spyOn, jasmine */

"use strict";

import linq from "../../src/linq";
import range from "../../src/modules/range";

describe("range", () => {

	it("should return simple valid iteration of numbers", () => {
		expect(() => range(1, 5).toArray()).toEqual([1, 2, 3, 4, 5]);
	});

	it("should throws an exception when count is negative", () => {
		expect(() => range(1, -5).toArray()).toThrowError("count may not be negative");
		expect(() => range(-1, -5).toArray()).toThrowError("count may not be negative");
		expect(() => range(-1, 3).toArray()).toEqual([-1, 0, 1]);
	});

	it("should throw an exception when count or start value are not number", () => {
		expect(() => range(-5, {}).toArray()).toThrowError("count must be a number type");
		expect(() => range({}, -5).toArray()).toThrowError("start value must be a number type");
	});

	it("should return an empty array with count zero", () => {
		expect(() => range(1, 0).toArray()).toEqual([]);
	});

});