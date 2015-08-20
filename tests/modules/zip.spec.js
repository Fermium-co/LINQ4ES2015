/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import linq from "../../src/linq";
import zip from "../../src/modules/zip";

describe("zip", () => {
  it("should throw an exception when the first source is null or undefined", () => {
    expect(() => zip(null, [], () => true).toArray()).toThrowError("first source is null or undefined");
    expect(() => zip(undefined, [], () => true).toArray()).toThrowError("first source is null or undefined");
  });

  it("should throw an exception when the second source is null or undefined", () => {
    expect(() => zip([], null, () => true).toArray()).toThrowError("second source is null or undefined");
    expect(() => zip([], undefined, () => true).toArray()).toThrowError("second source is null or undefined");
  });

  it("should throw an exception when the first source is not either an array or an enumerable", () => {
    expect(() => zip({}, [], () => true).toArray()).toThrowError("first source must be either an enumerable or an array");
  });

  it("should throw an exception when the second source is not either an array or an enumerable", () => {
    expect(() => zip([], {}).toArray(), () => true).toThrowError("second source must be either an enumerable or an array");
  });

  it("should throw an exception when the first source is not either an array or an enumerable", () => {
    expect(() => zip([], [], null).toArray()).toThrowError("selector must be a function");
  });

  it("should zip two arrays correctly", () => {
    let result = [1, 2, 3].asEnumerable().zip([1, 2, 3], (firstNum, secodnNum) => firstNum + secodnNum).toArray();
    expect(result).toEqual([2, 4, 6]);

    let result2 = [1, 2, 3, 4].asEnumerable().zip([1, 2, 3], (firstNum, secodnNum) => firstNum + secodnNum).toArray();
    expect(result2).toEqual([2, 4, 6]);
  });
});