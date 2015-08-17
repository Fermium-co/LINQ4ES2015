/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import linq from "../../src/linq";
import average from "../../src/modules/average";

describe("average", () => {
  it("should throws an exception when the source is null or undefined", () => {
    expect(() => average(null)).toThrowError("source is null or undefined");
    expect(() => average(undefined)).toThrowError("source is null or undefined");
  });

  it("should throws an exception when the source is not and enumerable", () => {
    expect(() => average({})).toThrowError("source can not be enumerated");
  });

  it("should return number of elements inside an enumerable", () => {
    expect([1, 2, 3].asEnumerable().average()).toEqual(2);
    expect(average([1, 2, 3])).toEqual(2);
  });

  it("should return number of elements passing a predicate inside an enumerable", () => {
    expect([1, 2, 3, 4, 5].asEnumerable().average(n => n % 2 !== 0)).toEqual(3);
    expect(average([1, 2, 3, 4, 5], n => n % 2 === 0)).toEqual(3);
  });
});