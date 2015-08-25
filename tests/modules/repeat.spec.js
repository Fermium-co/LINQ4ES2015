/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import repeat from "../../src/modules/repeat";
import toArray from "../../src/modules/toArray";

describe("repeat", () => {
  it("should throw an exception when count is not a number", () => {
    expect(() => toArray(repeat('A', {}))).toThrowError("count must be a number");
  });  

  it("should throw an exception when count is negative", () => {
    expect(() => toArray(repeat(1, -1))).toThrowError("count may not be negative");
  });
  
  it("should return simple valid iteration of numbers", () => {
    expect(toArray(repeat(1, 5))).toEqual([1, 1, 1, 1, 1]);
  });

  it("should return an empty array when count is zero", () => {
    expect(toArray(repeat(1, 0))).toEqual([]);
  });
});