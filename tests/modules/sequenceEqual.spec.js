/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import sequenceEqual from "../../src/modules/sequenceEqual";
import testUtils from '../testUtils';
import asEnumerable from "../../src/modules/asEnumerable";
import toArray from "../../src/modules/toArray";

describe("sequenceEqual", () => {
  testUtils.setPrototype('sequenceEqual', sequenceEqual);
  
  it("should throw an exception when the first is null or undefined", () => {
    expect(() => toArray(sequenceEqual(null, []))).toThrowError("first is null or undefined");
    expect(() => toArray(sequenceEqual(undefined, []))).toThrowError("first is null or undefined");
  });

  it("should throw an exception when the second is null or undefined", () => {
    expect(() => toArray(sequenceEqual([], null))).toThrowError("second is null or undefined");
    expect(() => toArray(sequenceEqual([], undefined))).toThrowError("second is null or undefined");
  });

  it("should throw an exception when the first can not be enumerated", () => {
    expect(() => toArray(sequenceEqual(123, []))).toThrowError("source can not be enumerated");
    expect(() => toArray(sequenceEqual(false, []))).toThrowError("source can not be enumerated");
  });

  it("should throw an exception when the second can not be enumerated", () => {
    expect(() => toArray(sequenceEqual([], 123))).toThrowError("source can not be enumerated");
    expect(() => toArray(sequenceEqual([], false))).toThrowError("source can not be enumerated");
  });

  it("should check two arrays are sequence equal or not", () => {
    let enumerable = asEnumerable([1, 2, 3]);
    let result = enumerable.sequenceEqual([1, 2, 3]);
    expect(result).toEqual(true);
    let result2 = enumerable.sequenceEqual([4, 5, 6]);
    expect(result2).toEqual(false);
    let result3 = enumerable.sequenceEqual([1, 2, 3, 4]);
    expect(result3).toEqual(false);
    let result4 = enumerable.sequenceEqual(asEnumerable([1, 2, 3, 4]));
    expect(result4).toEqual(false);
  });

  it("should check two arrays are sequence equal or not by custom comparer", () => {
    let result = asEnumerable(['A', 'B', 'C']).sequenceEqual(['a', 'b', 'c'], (first, second) => first == second.toUpperCase());
    expect(result).toEqual(true);
    let result2 = asEnumerable(['A', 'D', 'C']).sequenceEqual(['a', 'b', 'c'], (first, second) => first == second.toUpperCase());
    expect(result2).toEqual(false);
  });
});