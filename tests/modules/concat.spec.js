/* global describe, it, expect, spyOn, jasmine, toThrowError */

"use strict";

import linq from "../../src/linq";
import concat from "../../src/modules/concat";

describe("concat", () => {
  it("should concat two arrays correctly", () => {
    let result = [1, 2, 3].asEnumerable().concat([4, 5, 6]).toArray();
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
  });
  
  it("should concat two filtered arrays correctly", () => {
    let result = [1, 2, 3].asEnumerable().where(num => num % 2 == 0).concat([4, 5, 6].asEnumerable().where(num => num % 2 == 0)).toArray();
    expect(result).toEqual([2, 4, 6]);
  });

  it("should throws an exception when the first source is null or undefined", () => {
    expect(() => concat(null, []).toArray()).toThrowError("first source is null or undefined");
    expect(() => concat(undefined, []).toArray()).toThrowError("first source is null or undefined");
  });

  it("should throws an exception when the second source is null or undefined", () => {
    expect(() => concat([], null).toArray()).toThrowError("second source is null or undefined");
    expect(() => concat([], undefined).toArray()).toThrowError("second source is null or undefined");
  });

  it("should throws an exception when the first source is not either an array or an enumerable", () => {
    expect(() => concat({}, []).toArray()).toThrowError("first source must be either an enumerable or an array");
  });

  it("should throws an exception when the second source is not either an array or an enumerable", () => {
    expect(() => concat([], {}).toArray()).toThrowError("second source must be either an enumerable or an array");
  });

});