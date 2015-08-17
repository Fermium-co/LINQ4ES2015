/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import linq from "../../src/linq";
import min from "../../src/modules/min";

describe("min", () => {
  it("should throws an exception when the source is null or undefined", () => {
    expect(() => min(null)).toThrowError("source is null or undefined");
    expect(() => min(undefined)).toThrowError("source is null or undefined");
  });

  it("should throws an exception when the source is not and enumerable", () => {
    expect(() => min({})).toThrowError("source can not be enumerated");
  });

  it("should return number of elements inside an enumerable", () => {
    expect([1, 2, 3].asEnumerable().min()).toEqual(1);
    expect(min([1, 2, 3])).toEqual(1);
  });

  it("should return number of elements passing a predicate inside an enumerable", () => {
    expect([1, 2, 3, 4, 5].asEnumerable().min(n => n % 2 !== 0)).toEqual(1);
    expect(min([1, 2, 3, 4, 5], n => n % 2 === 0)).toEqual(2);
  });
});