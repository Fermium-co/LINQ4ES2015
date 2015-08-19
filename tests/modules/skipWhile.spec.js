/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import linq from "../../src/linq";
import skipWhile from "../../src/modules/skipWhile";

describe("skipWhile", () => {
  it("should throw exception when source is null or undefined", () => {
    expect(() => skipWhile(null, n => n > 0).toArray()).toThrowError("source is null or undefined");
    expect(() => skipWhile(undefined, n=> n > 0).toArray()).toThrowError("source is null or undefined");
  });

  it("should throw exception when predicate is null or undefined", () => {
    expect(() => skipWhile([1, 2], null).toArray()).toThrowError("predicate is null or undefined");
    expect(() => skipWhile([1, 2], undefined).toArray()).toThrowError("predicate is null or undefined");
  });

  it("should throw exception when predicate is not a function", () => {
    expect(() => skipWhile([1, 2], {}).toArray()).toThrowError("predicate must be a function");
  });

  it("should return 3 first items which is match", () => {
    expect([2, 4, 6, 7, 8, 9, 3].asEnumerable().skipWhile(n => n % 2 == 0).toArray()).toEqual([7, 8, 9, 3])
  });

  it("should return only first element of array ", () => {
    expect([2, 5, 6, 7, 1, 3].asEnumerable().skipWhile(n => n < 5).toArray()).toEqual([5, 6, 7, 1, 3]);
  });

  it("should return empty array ", () => {
    expect([2, 3, 4, 5, 6].asEnumerable().skipWhile(n => n % 2 == 0).toArray()).toEqual([3, 4, 5, 6]);
  });

  it("should return all of elements when all elements matches ", () => {
    expect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].asEnumerable().skipWhile(n => n < 10).toArray()).toEqual([10]);
  });

});