/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import skip from "../../src/modules/skip";
import testUtils from '../testUtils';
import asEnumerable from "../../src/modules/asEnumerable";
import toArray from '../../src/modules/toArray';

describe("skip", () => {
  testUtils.setPrototype('skip', skip);

  let arr = [1, 2, 3, 4, 5, 6];

  it("should throw an exception when the source is null or undefined", () => {
    expect(() => toArray(skip(null, 1))).toThrowError("source is null or undefined");
    expect(() => toArray(skip(undefined, 1))).toThrowError("source is null or undefined");
  });

  it("should throw an exception when the skip number is not a number", () => {
    expect(() => toArray(skip([], null))).toThrowError("count is null or undefined");
  });

  it("should throw an exception when the source is not an enumerable", () => {
    expect(() => toArray(skip(123, 1))).toThrowError("source can not be enumerated");
  });

  it("should throw an exception when the count is not a number", () => {
    expect(() => toArray(skip([], {}))).toThrowError("count must be a number");
  });

  it("should return an skipped enumerable with specified count", () => {
    let evenNumbers = toArray(asEnumerable(arr).skip(2));
    expect(evenNumbers).toEqual([3, 4, 5, 6]);
  });

  it("should return all elements when count is zero", () => {
    expect(toArray(asEnumerable(arr).skip(0))).toEqual(arr);
  });

  it("should return empty array when count is equal to or greater than array's length", () => {
    expect(toArray(asEnumerable(arr).skip(arr.length))).toEqual([]);
    expect(toArray(asEnumerable(arr).skip(arr.length + 1))).toEqual([]);
  });
});