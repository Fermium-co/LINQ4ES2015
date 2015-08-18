/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import linq from "../../src/linq";
import max from "../../src/modules/max";

describe("max", () => {
  it("should throw an exception when the source is null or undefined", () => {
    expect(() => max(null)).toThrowError("source is null or undefined");
    expect(() => max(undefined)).toThrowError("source is null or undefined");
  });

  it("should throw an exception when the source is not and enumerable", () => {
    expect(() => max({})).toThrowError("source can not be enumerated");
  });

  it("should return number of elements inside an enumerable", () => {
    expect([1, 2, 3].asEnumerable().max()).toEqual(3);
    expect(max([1, 2, 3])).toEqual(3);
  });

  it("should return number of elements passing a predicate inside an enumerable", () => {
    expect([1, 2, 3, 4, 5].asEnumerable().max(n => n % 2 !== 0)).toEqual(5);
    expect(max([1, 2, 3, 4, 5], n => n % 2 === 0)).toEqual(4);
  });
});