/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import empty from "../../src/modules/empty";
import toArray from '../../src/modules/toArray';

describe("empty", () => {
	it("should return an empty array", () => {
		expect(toArray(empty())).toEqual([]);
	});
});