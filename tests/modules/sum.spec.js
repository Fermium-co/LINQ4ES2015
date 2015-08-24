/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import sum from "../../src/modules/sum";
import testUtils from '../testUtils';
import asEnumerable from "../../src/modules/asEnumerable";

describe("sum", () => {
  testUtils.setPrototype('sum', sum);

  it("should throw an exception when the source is null or undefined", () => {
    expect(() => sum(null)).toThrowError("source is null or undefined");
    expect(() => sum(undefined)).toThrowError("source is null or undefined");
  });

  it("should throw an exception when the source is not and enumerable", () => {
    expect(() => sum(123)).toThrowError("source can not be enumerated");
    expect(() => sum(false)).toThrowError("source can not be enumerated");
  });

  it("should return the summation of all elements inside an enumerable", () => {
    expect(asEnumerable([1, 2, 3]).sum()).toEqual(6);
    expect(sum([1, 2, 3])).toEqual(6);
  });

  it("should return sum of elements passing a predicate inside an enumerable", () => {
    expect(asEnumerable([1, 2, 3]).sum(n => n * 2)).toEqual(12);
    expect(sum([1, 2, 3], n => n * 2)).toEqual(12);
  });
});