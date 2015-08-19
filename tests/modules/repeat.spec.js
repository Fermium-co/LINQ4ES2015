/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import linq from "../../src/linq";
import repeat from "../../src/modules/repeat";

describe("repeat", () => {
  it("should return simple valid iteration of numbers", () => {
    expect(repeat(1, 5).toArray()).toEqual([1, 1, 1, 1, 1]);
  });

  it("should throw an exception when count is negative", () => {
    expect(() => repeat(1, -5).toArray()).toThrowError("count may not be negative");
    expect(() => repeat(-1, -5).toArray()).toThrowError("count may not be negative");
    expect(repeat(-1, 3).toArray()).toEqual([-1, -1, -1]);
  });

  it("should throw an exception when count is not a number", () => {
    expect(repeat('A', 3).toArray()).toEqual(['A', 'A', 'A']);
    expect(() => repeat('A', {}).toArray()).toThrowError("count must be a number type");
  });

  it("should return an empty array with count zero", () => {
    expect(repeat(1, 0).toArray()).toEqual([]);
  });

});