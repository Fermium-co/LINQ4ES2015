/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import linq from "../../src/linq";
import count from "../../src/modules/count";

describe("count", () => {
  it("should throws an exception when the source is null or undefined", () => {
    expect(() => count(null)).toThrowError("source is null or undefined");
    expect(() => count(undefined)).toThrowError("source is null or undefined");
  });

  it("should throws an exception when the source is not and enumerable", () => {
    expect(() => count({})).toThrowError("source must be an enumerable");
  });

  it("should return number of elements inside an enumerable", () => {
    expect([1, 2, 3].asEnumerable().count()).toEqual(3);
    expect(count([1, 2, 3])).toEqual(3);
  });

  it("should return number of elements passing a predicate inside an enumerable", () => {
    expect([1, 2, 3, 4, 5].asEnumerable().count(n => n % 2 !== 0)).toEqual(3);
    expect(count([1, 2, 3, 4, 5], n => n % 2 === 0)).toEqual(2);
  });
});