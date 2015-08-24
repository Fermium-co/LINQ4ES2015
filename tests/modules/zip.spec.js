/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import zip from "../../src/modules/zip";
import testUtils from '../testUtils';
import asEnumerable from "../../src/modules/asEnumerable";
import toArray from '../../src/modules/toArray';

describe("zip", () => {
  testUtils.setPrototype('zip', zip);

  let fn = () => { };

  it("should throw an exception when the first source is null or undefined", () => {
    expect(() => toArray(zip(null, [], fn))).toThrowError("first source is null or undefined");
    expect(() => toArray(zip(undefined, [], fn))).toThrowError("first source is null or undefined");
  });

  it("should throw an exception when the second source is null or undefined", () => {
    expect(() => toArray(zip([], null, fn))).toThrowError("second source is null or undefined");
    expect(() => toArray(zip([], undefined, fn))).toThrowError("second source is null or undefined");
  });

  it("should throw an exception when the resultSelector is null or undefined", () => {
    expect(() => toArray(zip([], [], null))).toThrowError("resultSelector is null or undefined");
    expect(() => toArray(zip([], [], undefined))).toThrowError("resultSelector is null or undefined");
  });

  it("should throw an exception when the first is not an enumerable", () => {
    expect(() => toArray(zip(123, [], fn))).toThrowError("source can not be enumerated");
    expect(() => toArray(zip(false, [], fn))).toThrowError("source can not be enumerated");
  });

  it("should throw an exception when the second is not an enumerable", () => {
    expect(() => toArray(zip([], 123, fn))).toThrowError("source can not be enumerated");
  });

  it("should throw an exception when the first source is not either an array or an enumerable", () => {
    expect(() => toArray(zip([], [], {}))).toThrowError("resultSelector must be a function");
  });

  it("should zip two arrays correctly", () => {
    let result = toArray(asEnumerable([1, 2, 3]).zip([1, 2, 3], (firstNum, secodnNum) => firstNum + secodnNum));
    expect(result).toEqual([2, 4, 6]);

    let result2 = toArray(asEnumerable([1, 2, 3, 4]).zip([1, 2, 3], (firstNum, secodnNum) => firstNum + secodnNum));
    expect(result2).toEqual([2, 4, 6]);
  });
});