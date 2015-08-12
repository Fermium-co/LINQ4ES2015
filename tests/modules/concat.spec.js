/* global toThrowError */
/* global describe, it, expect, spyOn, jasmine */

"use strict";

import linq from "../../src/linq";
import concat from "../../src/modules/concat";

describe("concat", () => {

  it("should concat two arrays correctly", () => {
    let result = [1, 2, 3].asEnumerable().where(num => num % 2 == 0).concat([4, 5, 6].asEnumerable().where(num => num % 2 == 0)).toArray();
    expect(result.length).toBe(3);
    expect(result[0]).toBe(2);
    expect(result[1]).toBe(4);
    expect(result[2]).toBe(6);
  });

  it("should concat two filtered arrays correctly", () => {
    let result = [1, 2, 3].asEnumerable().concat([4, 5, 6]).toArray();
    expect(result.length).toBe(6);
    expect(result[0]).toBe(1);
    expect(result[1]).toBe(2);
    expect(result[2]).toBe(3);
    expect(result[3]).toBe(4);
    expect(result[4]).toBe(5);
    expect(result[5]).toBe(6);
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