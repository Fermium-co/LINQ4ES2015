/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import linq from "../../src/linq";
import sum from "../../src/modules/sum";

describe("sum", () => {
  it("should throw an exception when the source is null or undefined", () => {
    expect(() => sum(null)).toThrowError("source is null or undefined");
    expect(() => sum(undefined)).toThrowError("source is null or undefined");
  });

  it("should throw an exception when the source is not and enumerable", () => {
    expect(() => sum({})).toThrowError("source can not be enumerated");
  });

  it("should return number of elements inside an enumerable", () => {
    expect([1, 2, 3].asEnumerable().sum()).toEqual(6);
    expect(sum([1, 2, 3])).toEqual(6);
  });

  it("should return number of elements passing a predicate inside an enumerable", () => {
    expect([1, 2, 3, 4, 5].asEnumerable().sum(n => n % 2 !== 0)).toEqual(9);
    expect(sum([1, 2, 3, 4, 5], n => n % 2 === 0)).toEqual(6);
  });
});