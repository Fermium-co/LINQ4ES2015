/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import linq from "../../src/linq";
import takeWhile from "../../src/modules/takeWhile";

describe("takeWhile", () => {
  it("should throw exception when source is null or undefined", () => {
    expect(() => takeWhile(null, n => n > 0).toArray()).toThrowError("source is null or undefined");
    expect(() => takeWhile(undefined, n=> n > 0).toArray()).toThrowError("source is null or undefined");
  });

  it("should throw exception when predicate is null or undefined", () => {
    expect(() => takeWhile([1, 2], null).toArray()).toThrowError("predicate is null or undefined");
    expect(() => takeWhile([1, 2], undefined).toArray()).toThrowError("predicate is null or undefined");
  });

  it("should throw exception when predicate is not a function", () => {
    expect(() => takeWhile([1, 2], {}).toArray()).toThrowError("predicate must be a function");
  });

  it("should return 3 first items which is match", () => {
    expect([2, 4, 6, 7, 8, 9, 3].asEnumerable().takeWhile(n => n % 2 == 0).toArray()).toEqual([2, 4, 6])
  });

  it("should return only first element of array ", () => {
    expect([2, 5, 6, 7, 1, 3].asEnumerable().takeWhile(n => n < 5).toArray()).toEqual([2]);
  });

  it("should return empty array ", () => {
    expect([1, 2, 3, 4, 5, 6].asEnumerable().takeWhile(n => n % 2 == 0).toArray()).toEqual([]);
  });

  it("should return all of elements when all elements matches ", () => {
    expect([1, 2, 3, 4, 5, 6, 7, 8, 9].asEnumerable().takeWhile(n => n < 10).toArray()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

});