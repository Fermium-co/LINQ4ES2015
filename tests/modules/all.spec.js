/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import linq from "../../src/linq";
import all from "../../src/modules/all";

describe("all", () => {
  it("should throw exception when source is null or undefined", () => {
    expect(() => all(null, n => n > 0).toThrowError("source is null or undefined"));
    expect(() => all(undefined, n => n > 0)).toThrowError("source is null or undefined");
  });
  
  it("should throw an exception when the source is not an enumerable", () => {
    expect(() => all({}, n => n > 0)).toThrowError("source must be an enumerable");
  });

  it("should throw exception when predicate is null or undefined", () => {
    expect(() => [1, 2, 3].asEnumerable().all()).toThrowError("predicate is null or undefined");
    expect(() => [1, 2, 3].asEnumerable().all(null)).toThrowError("predicate is null or undefined");
  });

  it("should return true when enumerable is empty", () => {
    expect([].asEnumerable().all(item => item > 0)).toEqual(true);
  });

  it("should return true when all items in enumerable passing the predicate", () => {
    expect([1, 2, 3].asEnumerable().all(item => item < 4)).toEqual(true);
  });

  it("should return false when at least one item doesn't pass the predicate", () => {
    expect([1, 2, 3, 4].asEnumerable().all(item => item < 4)).toEqual(false);
  });
});