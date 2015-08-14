/* global toThrowError */
/* global describe, it, expect, spyOn, jasmine */

"use strict";

import linq from "../../src/linq";
import empty from "../../src/modules/empty";

describe("empty", () => {

	it("should return an empty array", () => {
		expect(empty().toArray()).toEqual([]);
	});

});